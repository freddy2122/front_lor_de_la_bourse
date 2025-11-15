import apiClient from './apiClient';

function toISODate(raw) {
  if (!raw) return '';
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  if (typeof raw === 'number') return new Date(raw).toISOString().slice(0, 10);
  if (typeof raw === 'string') {
    const s = raw.trim();
    // ISO-like: 2025-11-10 or 2025/11/10
    let m = s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/);
    if (m) {
      const y = m[1].padStart(4, '0');
      const mo = m[2].padStart(2, '0');
      const d = m[3].padStart(2, '0');
      return `${y}-${mo}-${d}`;
    }
    // European: 10/11/2025 or 10-11-2025
    m = s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})/);
    if (m) {
      const d = m[1].padStart(2, '0');
      const mo = m[2].padStart(2, '0');
      const y = m[3].padStart(4, '0');
      return `${y}-${mo}-${d}`;
    }
    // Try Date.parse fallback
    const t = Date.parse(s);
    if (!isNaN(t)) return new Date(t).toISOString().slice(0, 10);
  }
  return '';
}

function normalizePublication(it) {
  const id = it.id ?? it.uuid ?? it._id ?? `${(it.company || it.company_name || it.issuer || 'pub')}-${(it.published_at || it.date || it.created_at || '')}`;
  const rawDate = it.date || it.published_at || it.created_at || it.updated_at || '';
  const date = toISODate(rawDate);
  const company = it.company || it.company_name || it.issuer || it.issuer_name || it.symbol || '';
  const title = it.title || it.name || it.subject || it.headline || '';
  const type = it.type || it.category || it.kind || '';
  const pdf_url = it.pdf_url || it.file_url || it.url || it.link || '#';
  return { id, date, company, title, type, pdf_url };
}

function paginate(list, page, per_page) {
  const total = list.length;
  const last_page = Math.max(1, Math.ceil(total / per_page));
  const p = Math.min(Math.max(1, page), last_page);
  const start = (p - 1) * per_page;
  const data = list.slice(start, start + per_page);
  return { data, meta: { page: p, per_page, total, last_page } };
}

function applyFilters(list, { q = '', symbol = '', type = '', from = '', to = '' }) {
  let filtered = [...list];
  if (q) {
    const k = q.toLowerCase();
    filtered = filtered.filter((i) => (i.title || '').toLowerCase().includes(k) || (i.company || '').toLowerCase().includes(k));
  }
  if (symbol) {
    const s = symbol.toLowerCase();
    filtered = filtered.filter((i) => (i.company || '').toLowerCase().includes(s));
  }
  if (type) {
    filtered = filtered.filter((i) => (i.type || '').toLowerCase() === type.toLowerCase());
  }
  if (from) {
    filtered = filtered.filter((i) => (i.date || '') >= from);
  }
  if (to) {
    filtered = filtered.filter((i) => (i.date || '') <= to);
  }
  return filtered;
}

async function fetchRichBourseIndexPages({ pages = 1 } = {}) {
  const all = [];
  for (let p = 1; p <= Math.max(1, pages); p++) {
    const url = p === 1
      ? `https://r.jina.ai/https://www.richbourse.com/common/actualite/index`
      : `https://r.jina.ai/https://www.richbourse.com/common/actualite/index?page=${p}`;
    try {
      const res = await fetch(url, { credentials: 'omit' });
      const txt = await res.text();
      // Chercher les lignes Markdown [Titre](URL)
      const re = /\[([^\]]+?)\]\((https?:\/\/www\.richbourse\.com\/common\/actualite\/details\/[^)]+)\)/g;
      let m;
      while ((m = re.exec(txt))) {
        const fullTitle = (m[1] || '').trim();
        const link = m[2];
        const dm = link.match(/\/details\/(\d{2})-(\d{2})-(\d{4})-/);
        const date = dm ? `${dm[3]}-${dm[2]}-${dm[1]}` : '';
        const parts = fullTitle.split(' : ');
        const company = (parts[0] || '').trim();
        const rest = (parts.slice(1).join(' : ') || '').trim();
        const title = rest || fullTitle;
        let kind = '';
        const low = title.toLowerCase();
        if (low.includes('rapport')) kind = 'rapport';
        else if (low.includes('avis')) kind = 'avis';
        else if (low.includes('dividende')) kind = 'dividende';
        else if (low.includes('communiqué')) kind = 'avis';

        all.push({
          id: link,
          date,
          company,
          title,
          type: kind,
          pdf_url: link,
        });
      }
    } catch (_) {}
  }
  // Dédupliquer par id
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

export async function fetchOfficialPublications({ q = '', symbol = '', type = '', from = '', to = '', page = 1, per_page = 10 } = {}) {
  const SOURCE = (import.meta && import.meta.env && import.meta.env.VITE_PUBLICATIONS_SOURCE) || 'mock';
  if (SOURCE === 'mock') {
    const mock = [
      { id: '11-11-2025-agl-acc-attestation', date: '2025-11-11', company: 'AFRICA GLOBAL LOGISTICS CI', title: "Attestation des Commissaires Aux Comptes - 1er semestre 2025", type: 'rapport', pdf_url: '#' },
      { id: '11-11-2025-agl-rapport-s1', date: '2025-11-11', company: 'AFRICA GLOBAL LOGISTICS CI', title: "Rapport d'activités - 1er semestre 2025", type: 'rapport', pdf_url: '#' },
      { id: '11-11-2025-total-sn-acc-rapport', date: '2025-11-11', company: 'TOTALENERGIES MARKETING SN', title: "Attestation CAC sur le Rapport d'activités - 1er semestre 2025", type: 'rapport', pdf_url: '#' },
      { id: '11-11-2025-sonatel-transaction-dossier', date: '2025-11-11', company: 'SONATEL SN', title: 'Transaction Sur Dossier', type: 'avis', pdf_url: '#' },
      { id: '10-11-2025-boa-ml-rapport-t3', date: '2025-11-10', company: 'BOA ML', title: "Rapport d'activités - 3ème trimestre 2025", type: 'rapport', pdf_url: '#' },
      { id: '10-11-2025-homologation-sgi-tg', date: '2025-11-10', company: 'SGI TOGO', title: 'Homologation des tarifs', type: 'avis', pdf_url: '#' },
      { id: '05-11-2025-nestle-acc-rapport-s1', date: '2025-11-05', company: 'NESTLE CI', title: "Attestation CAC sur le Rapport d'activités - 1er semestre 2025", type: 'rapport', pdf_url: '#' },
      { id: '05-11-2025-sonatel-cp-t3', date: '2025-11-05', company: 'SONATEL', title: 'Communiqué de presse - Résultats T3 2025', type: 'rapport', pdf_url: '#' },
    ];
    const data = applyFilters(mock, { q, symbol, type, from, to });
    return paginate(data, page, per_page);
  }
  const baseURL = (typeof apiClient !== 'undefined' && apiClient?.defaults?.baseURL) ? String(apiClient.defaults.baseURL) : '';
  const host = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : '';
  const isProdHost = !!(host && !/^localhost$|^127\.(?:\d+\.){2}\d+$/.test(host));
  const isBackendLocalOrMissing = !baseURL || /^http:\/\/localhost(?::\d+)?\//i.test(baseURL);

  // Prépare les promesses (concurrentes)
  const primaryPromise = (async () => {
    try {
      const res = await apiClient.get('/market/official-publications', {
        params: { q, symbol, type, from, to, page, per_page },
      });
      const body = res?.data;
      let primary = [];
      if (Array.isArray(body)) {
        primary = body.map(normalizePublication);
      } else if (body && Array.isArray(body.data)) {
        primary = body.data.map(normalizePublication);
      } else if (body && body.items && Array.isArray(body.items)) {
        primary = body.items.map(normalizePublication);
      } else {
        const arr = Object.values(body || {}).filter((v) => typeof v === 'object' && v);
        if (arr.length && Array.isArray(arr[0])) {
          primary = arr[0].map(normalizePublication);
        }
      }
      return applyFilters(primary, { q, symbol, type, from, to });
    } catch (_) {
      return [];
    }
  })();

  const rbPromise = (async () => {
    try {
      const rb = await fetchRichBourseIndexPages({ pages: 2 });
      return applyFilters(rb, { q, symbol, type, from, to });
    } catch (_) {
      return [];
    }
  })();

  // En prod sans backend, privilégier le fallback immédiatement
  if (isProdHost && isBackendLocalOrMissing) {
    const rb = await rbPromise;
    if (rb.length) return paginate(rb, page, per_page);
    const primary = await primaryPromise;
    return paginate(primary, page, per_page);
  }

  // Sinon, agréger et choisir le plus frais
  const [prRes, rbRes] = await Promise.allSettled([primaryPromise, rbPromise]);
  const primary = prRes.status === 'fulfilled' ? prRes.value : [];
  const rb = rbRes.status === 'fulfilled' ? rbRes.value : [];
  const latestRb = rb.reduce((max, it) => (it.date > max ? it.date : max), '');
  const latestPrimary = primary.reduce((max, it) => (it.date > max ? it.date : max), '');

  if (rb.length && (!primary.length || latestRb > latestPrimary)) {
    return paginate(rb, page, per_page);
  }
  return paginate(primary, page, per_page);
}

export default { fetchOfficialPublications };
