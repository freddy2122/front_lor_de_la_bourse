export const config = { runtime: 'edge' };

function toNumber(str) {
  if (str == null) return null;
  const s = String(str).replace(/[^0-9,.-]/g, '').replace(/,/g, '.');
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function applyFilters(list, { q = '' }) {
  if (!q) return list;
  const k = q.toLowerCase();
  return list.filter((i) =>
    (i.company || '').toLowerCase().includes(k) ||
    (i.symbol || '').toLowerCase().includes(k)
  );
}

function paginate(list, page, per_page) {
  const total = list.length;
  const last_page = Math.max(1, Math.ceil(total / per_page));
  const p = Math.min(Math.max(1, page), last_page);
  const start = (p - 1) * per_page;
  const data = list.slice(start, start + per_page);
  return { data, meta: { page: p, per_page, total, last_page } };
}

async function fetchQuotesPages({ pages = 1 } = {}) {
  const all = [];
  for (let p = 1; p <= Math.max(1, pages); p++) {
    const url = p === 1
      ? 'https://r.jina.ai/https://www.richbourse.com/common/variation/index'
      : `https://r.jina.ai/https://www.richbourse.com/common/variation/index?page=${p}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, cache: 'no-store' });
      const txt = await res.text();
      // On cherche les lignes de type "SYMBOL - NOM SOCIETE" suivies de chiffres
      const lines = txt.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Exemple RichBourse (Markdown): "SONATEL SN" ou "SONATEL : Sonatel"
        // On cible surtout les lignes avec [Société] (lien) comme source de nom, puis on lit les chiffres qui suivent.
        const mTitle = line.match(/^\[(.+?)\]\(https?:\/\/www\.richbourse\.com\/common\/fiche-valeur\/([^\)]+)\)/i);
        if (mTitle) {
          const company = mTitle[1].trim();
          const symbolSlug = mTitle[2];
          const symbolMatch = symbolSlug.match(/^([A-Z0-9-_]+)/i);
          const symbol = symbolMatch ? symbolMatch[1].toUpperCase() : company;

          // Les chiffres (dernier, var, var%, volume) sont généralement dans les lignes suivantes
          // On prend les 3-4 prochaines lignes et on essaie d'extraire des nombres
          const windowLines = lines.slice(i + 1, i + 6).map((l) => l.trim()).join(' ');
          const nums = windowLines.match(/[0-9][0-9\.\s,]*[0-9]/g) || [];

          const last = toNumber(nums[0]);
          const change = toNumber(nums[1]);
          const changePct = toNumber(nums[2]);
          const volume = toNumber(nums[3]);

          all.push({
            id: symbol,
            symbol,
            company,
            last,
            change,
            changePct,
            volume,
          });
        }
      }
    } catch (e) {
      // ignore page errors
    }
  }

  // dédupe par symbol
  const seen = new Set();
  const uniq = [];
  for (const it of all) {
    if (!seen.has(it.symbol)) {
      seen.add(it.symbol);
      uniq.push(it);
    }
  }

  // tri par société
  uniq.sort((a, b) => (a.company || '').localeCompare(b.company || ''));
  return uniq;
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const per_page = parseInt(searchParams.get('per_page') || '50', 10);

    const items = await fetchQuotesPages({ pages: 1 });
    const filtered = applyFilters(items, { q });
    const resp = paginate(filtered, page, per_page);

    return new Response(JSON.stringify(resp), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ data: [], meta: { page: 1, per_page: 50, total: 0, last_page: 1 }, error: 'failed' }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  }
}
