export const config = { runtime: 'edge' };

function toISODate(raw) {
  if (!raw) return '';
  const m = raw.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return '';
}

function applyFilters(list, { q = '' }) {
  if (!q) return list;
  const k = q.toLowerCase();
  return list.filter((i) => (i.title || '').toLowerCase().includes(k) || (i.company || '').toLowerCase().includes(k));
}

function paginate(list, page, per_page) {
  const total = list.length;
  const last_page = Math.max(1, Math.ceil(total / per_page));
  const p = Math.min(Math.max(1, page), last_page);
  const start = (p - 1) * per_page;
  const data = list.slice(start, start + per_page);
  return { data, meta: { page: p, per_page, total, last_page } };
}

async function fetchNewsPages({ pages = 2 } = {}) {
  const all = [];
  for (let p = 1; p <= Math.max(1, pages); p++) {
    const url = p === 1
      ? 'https://www.richbourse.com/common/news/index'
      : `https://www.richbourse.com/common/news/index?page=${p}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const re = /href="(\/common\/news\/details\/[^\"]+)"[^>]*>([^<]+)<\/a>/g;
      let m;
      while ((m = re.exec(html))) {
        const path = m[1];
        const text = (m[2] || '').trim();
        if (!/\/common\/news\/details\//.test(path)) continue;
        const link = `https://www.richbourse.com${path}`;
        const d = toISODate(path);
        const parts = text.split(' : ');
        const company = (parts.length > 1 ? parts[0] : '').trim();
        const title = (parts.length > 1 ? parts.slice(1).join(' : ') : text).trim();
        all.push({ id: link, date: d, company, title, url: link });
      }
    } catch (e) {
      // ignore
    }
  }
  // dedupe by id
  const seen = new Set();
  const uniq = [];
  for (const it of all) {
    if (!seen.has(it.id)) { seen.add(it.id); uniq.push(it); }
  }
  // sort desc by date then title
  uniq.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  return uniq;
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const per_page = parseInt(searchParams.get('per_page') || '10', 10);

    const items = await fetchNewsPages({ pages: 2 });
    const filtered = applyFilters(items, { q });
    const resp = paginate(filtered, page, per_page);

    return new Response(JSON.stringify(resp), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ data: [], meta: { page: 1, per_page: 10, total: 0, last_page: 1 }, error: 'failed' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
}
