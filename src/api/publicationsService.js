import apiClient from './apiClient';

function normalizePublication(it) {
  const id = it.id ?? it.uuid ?? it._id ?? `${(it.company || it.company_name || it.issuer || 'pub')}-${(it.published_at || it.date || it.created_at || '')}`;
  const rawDate = it.date || it.published_at || it.created_at || it.updated_at || '';
  const date = typeof rawDate === 'string' ? rawDate.slice(0, 10) : new Date(rawDate).toISOString().slice(0, 10);
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

export async function fetchOfficialPublications({ q = '', symbol = '', type = '', from = '', to = '', page = 1, per_page = 10 } = {}) {
  try {
    const res = await apiClient.get('/market/official-publications', {
      params: { q, symbol, type, from, to, page, per_page },
    });
    const body = res?.data;
    if (Array.isArray(body)) {
      const mapped = body.map(normalizePublication);
      return paginate(mapped, page, per_page);
    }
    if (body && Array.isArray(body.data)) {
      const mapped = body.data.map(normalizePublication);
      return { data: mapped, meta: body.meta || { page, per_page, total: mapped.length, last_page: Math.max(1, Math.ceil(mapped.length / per_page)) } };
    }
    if (body && body.items && Array.isArray(body.items)) {
      const mapped = body.items.map(normalizePublication);
      return { data: mapped, meta: body.meta || { page, per_page, total: mapped.length, last_page: Math.max(1, Math.ceil(mapped.length / per_page)) } };
    }
    const arr = Object.values(body || {}).filter((v) => typeof v === 'object' && v);
    if (arr.length && Array.isArray(arr[0])) {
      const mapped = arr[0].map(normalizePublication);
      return paginate(mapped, page, per_page);
    }
    return { data: [], meta: { page, per_page, total: 0, last_page: 1 } };
  } catch (_e) {
    return { data: [], meta: { page, per_page, total: 0, last_page: 1 } };
  }
}

export default { fetchOfficialPublications };
