import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function applyFilters(list, { q = '', symbol = '', type = '', from = '', to = '' }) {
  let filtered = [...list];
  if (q) {
    const k = q.toLowerCase();
    filtered = filtered.filter(
      (i) => i.title.toLowerCase().includes(k) || i.company.toLowerCase().includes(k)
    );
  }
  if (symbol) {
    const s = symbol.toLowerCase();
    filtered = filtered.filter((i) => i.company.toLowerCase().includes(s));
  }
  if (type) {
    filtered = filtered.filter((i) => i.type === type);
  }
  if (from) {
    filtered = filtered.filter((i) => i.date >= from);
  }
  if (to) {
    filtered = filtered.filter((i) => i.date <= to);
  }
  return filtered;
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
  if (API_BASE_URL) {
    try {
      const res = await axios.get(`${API_BASE_URL}/market/official-publications`, {
        params: { q, symbol, type, from, to, page, per_page },
      });
      if (Array.isArray(res.data)) {
        return paginate(res.data, page, per_page);
      }
      if (res.data && res.data.data) {
        return res.data;
      }
    } catch (_) {}
  }
  const mock = [
    { id: 1, date: '2025-11-05', company: 'SONATEL', title: "Communiqué de presse - Résultats T3 2025", type: 'rapport', pdf_url: '#' },
    { id: 2, date: '2025-11-03', company: 'TOTAL CI', title: "Avis de convocation à l'AGM", type: 'avis', pdf_url: '#' },
    { id: 3, date: '2025-10-28', company: 'ECOBANK', title: 'Annonce de dividende intérimaire', type: 'dividende', pdf_url: '#' },
    { id: 4, date: '2025-10-20', company: 'BOA CI', title: 'Publication des résultats semestriels', type: 'rapport', pdf_url: '#' },
    { id: 5, date: '2025-10-18', company: 'CORIS', title: "Avis de distribution de dividende", type: 'dividende', pdf_url: '#' },
    { id: 6, date: '2025-10-12', company: 'ORAGROUP', title: 'Note d’information', type: 'avis', pdf_url: '#' },
    { id: 7, date: '2025-10-09', company: 'SGCI', title: 'Rapport financier T2 2025', type: 'rapport', pdf_url: '#' },
    { id: 8, date: '2025-10-01', company: 'UNILEVER CI', title: 'Annonce dividende', type: 'dividende', pdf_url: '#' },
    { id: 9, date: '2025-09-25', company: "SAPH", title: 'Avis sur opération exceptionnelle', type: 'avis', pdf_url: '#' },
    { id: 10, date: '2025-09-14', company: 'NESTLE CI', title: 'Rapport annuel 2024', type: 'rapport', pdf_url: '#' },
    { id: 11, date: '2025-09-10', company: 'SICABLE', title: 'Convocation AGE', type: 'avis', pdf_url: '#' },
  ];
  const filtered = applyFilters(mock, { q, symbol, type, from, to });
  return paginate(filtered, page, per_page);
}

export default { fetchOfficialPublications };
