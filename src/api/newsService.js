import apiClient from './apiClient';

function toISODate(raw) {
  if (!raw) return '';
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  if (typeof raw === 'number') return new Date(raw).toISOString().slice(0, 10);
  if (typeof raw === 'string') {
    const s = raw.trim();
    let m = s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/);
    if (m) {
      const y = m[1].padStart(4, '0');
      const mo = m[2].padStart(2, '0');
      const d = m[3].padStart(2, '0');
      return `${y}-${mo}-${d}`;
    }
    m = s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})/);
    if (m) {
      const d = m[1].padStart(2, '0');
      const mo = m[2].padStart(2, '0');
      const y = m[3].padStart(4, '0');
      return `${y}-${mo}-${d}`;
    }
    const t = Date.parse(s);
    if (!isNaN(t)) return new Date(t).toISOString().slice(0, 10);
  }
  return '';
}

function normalizeNews(it) {
  const id = it.id ?? it.uuid ?? it._id ?? `${(it.source || 'news')}-${(it.published_at || it.date || it.created_at || it.title || '')}`;
  const rawDate = it.date || it.published_at || it.created_at || it.updated_at || '';
  const date = toISODate(rawDate);
  const title = it.title || it.headline || it.name || '';
  const company = it.company || it.issuer || it.symbol || '';
  const url = it.url || it.link || it.permalink || '#';
  return { id, date, title, company, url };
}

function paginate(list, page, per_page) {
  const total = list.length;
  const last_page = Math.max(1, Math.ceil(total / per_page));
  const p = Math.min(Math.max(1, page), last_page);
  const start = (p - 1) * per_page;
  const data = list.slice(start, start + per_page);
  return { data, meta: { page: p, per_page, total, last_page } };
}

function applyFilters(list, { q = '' }) {
  let filtered = [...list];
  if (q) {
    const k = q.toLowerCase();
    filtered = filtered.filter((i) => (i.title || '').toLowerCase().includes(k) || (i.company || '').toLowerCase().includes(k));
  }
  return filtered;
}

async function fetchRichBourseNewsPages({ pages = 1 } = {}) {
  const all = [];
  for (let p = 1; p <= Math.max(1, pages); p++) {
    const url = p === 1
      ? `https://r.jina.ai/https://www.richbourse.com/common/news/index`
      : `https://r.jina.ai/https://www.richbourse.com/common/news/index?page=${p}`;
    try {
      const res = await fetch(url, { credentials: 'omit' });
      const txt = await res.text();
      const re = /\[([^\]]+?)\]\((https?:\/\/www\.richbourse\.com\/(?:common\/news\/details|common\/apprendre\/article)\/[^)]+)\)/g;
      let m;
      while ((m = re.exec(txt))) {
        const fullTitle = (m[1] || '').trim();
        const link = m[2];
        // Extraire YYYY-MM-DD ou DD-MM-YYYY de l'URL
        let date = '';
        let m1 = link.match(/\/(\d{4})-(\d{2})-(\d{2})-/); // YYYY-MM-DD
        if (m1) {
          date = `${m1[1]}-${m1[2]}-${m1[3]}`;
        } else {
          const m2 = link.match(/\/(\d{2})-(\d{2})-(\d{4})-/); // DD-MM-YYYY
          if (m2) date = `${m2[3]}-${m2[2]}-${m2[1]}`;
        }
        const parts = fullTitle.split(' : ');
        const company = (parts.length > 1 ? parts[0] : '').trim();
        const title = (parts.length > 1 ? parts.slice(1).join(' : ') : fullTitle).trim();
        all.push({ id: link, date, company, title, url: link });
      }
    } catch (_) {}
  }
  const uniq = [];
  const seen = new Set();
  for (const it of all) {
    if (!seen.has(it.id)) {
      seen.add(it.id);
      uniq.push(it);
    }
  }
  return uniq;
}

export async function fetchNews({ q = '', page = 1, per_page = 10 } = {}) {
  const baseURL = (apiClient?.defaults?.baseURL) ? String(apiClient.defaults.baseURL) : '';
  const host = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : '';
  const isProdHost = !!(host && !/^localhost$|^127\.(?:\d+\.){2}\d+$/.test(host));
  const isBackendLocalOrMissing = !baseURL || /^http:\/\/localhost(?::\d+)?\//i.test(baseURL);

  // En développement/local : si on pointe vers une API Laravel locale (localhost ou 127.0.0.1),
  // on utilise uniquement l'API backend pour plus de rapidité et on ne scrape pas RichBourse côté front.
  const isLocalApi = baseURL.startsWith('http://127.0.0.1') || baseURL.startsWith('http://localhost');
  if (isLocalApi) {
    try {
      // En local, on consomme les actualités BRVM directement depuis l'API Laravel.
      const res = await apiClient.get('/market/brvm-news', { params: { q, page, per_page } });
      const body = res?.data;
      let list = [];
      if (Array.isArray(body)) list = body.map(normalizeNews);
      else if (body && Array.isArray(body.data)) list = body.data.map(normalizeNews);
      else if (body && body.items && Array.isArray(body.items)) list = body.items.map(normalizeNews);
      else {
        const arr = Object.values(body || {}).filter((v) => typeof v === 'object' && v);
        if (arr.length && Array.isArray(arr[0])) list = arr[0].map(normalizeNews);
      }
      return paginate(applyFilters(list, { q }), page, per_page);
    } catch (_) {
      return paginate([], page, per_page);
    }
  }

  const primaryPromise = (async () => {
    try {
      const res = await apiClient.get('/market/news', { params: { q, page, per_page } });
      const body = res?.data;
      let list = [];
      if (Array.isArray(body)) list = body.map(normalizeNews);
      else if (body && Array.isArray(body.data)) list = body.data.map(normalizeNews);
      else if (body && body.items && Array.isArray(body.items)) list = body.items.map(normalizeNews);
      else {
        const arr = Object.values(body || {}).filter((v) => typeof v === 'object' && v);
        if (arr.length && Array.isArray(arr[0])) list = arr[0].map(normalizeNews);
      }
      return applyFilters(list, { q });
    } catch (_) {
      return [];
    }
  })();

  const rbPromise = (async () => {
    try {
      const rb = await fetchRichBourseNewsPages({ pages: 2 });
      return applyFilters(rb, { q });
    } catch (_) {
      return [];
    }
  })();

  if (isProdHost && isBackendLocalOrMissing) {
    const rb = await rbPromise;
    if (rb.length) return paginate(rb, page, per_page);
    const primary = await primaryPromise;
    return paginate(primary, page, per_page);
  }

  const [prRes, rbRes] = await Promise.allSettled([primaryPromise, rbPromise]);
  const primary = prRes.status === 'fulfilled' ? prRes.value : [];
  const rb = rbRes.status === 'fulfilled' ? rbRes.value : [];
  const latestRb = rb.reduce((max, it) => (it.date > max ? it.date : max), '');
  const latestPrimary = primary.reduce((max, it) => (it.date > max ? it.date : max), '');
  if (rb.length && (!primary.length || latestRb > latestPrimary)) return paginate(rb, page, per_page);
  return paginate(primary, page, per_page);
}

export async function fetchNewsDetail({ id }) {
  if (!id) return null;
  try {
    const baseURL = (apiClient?.defaults?.baseURL) ? String(apiClient.defaults.baseURL) : '';
    const isLocalApi = baseURL.startsWith('http://127.0.0.1') || baseURL.startsWith('http://localhost');

    // En local, on pointe vers l'endpoint BRVM dédié.
    const path = isLocalApi
      ? `/market/brvm-news/${encodeURIComponent(id)}`
      : `/market/news/${encodeURIComponent(id)}`;

    const res = await apiClient.get(path);
    const body = res?.data || {};

    const base = normalizeNews(body);
    const contentHtml = body.content_html || body.contentHtml || body.html || null;
    const contentText = body.content_text || body.contentText || body.text || body.body || null;
    const url = body.url || body.link || base.url || null;

    return {
      ...base,
      contentHtml,
      contentText,
      url,
    };
  } catch (_) {
    return null;
  }
}

export default { fetchNews, fetchNewsDetail };
