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
      const re = /\[([^\]]+?)\]\((https?:\/\/www\.richbourse\.com\/common\/news\/details\/[^)]+)\)/g;
      let m;
      while ((m = re.exec(txt))) {
        const fullTitle = (m[1] || '').trim();
        const link = m[2];
        const dm = link.match(/\/details\/(\d{2})-(\d{2})-(\d{4})-/);
        const date = dm ? `${dm[3]}-${dm[2]}-${dm[1]}` : '';
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

export default { fetchNews };
