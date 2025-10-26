// Content service for articles. Uses backend API first, falls back to mock.
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchArticles() {
  if (API_BASE_URL) {
    try {
      const res = await axios.get(`${API_BASE_URL}/articles`);
      // Support both array payload and {data: []}
      const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      return list;
    } catch (_) {}
  }
  // mock fallback
  return [
    { slug: 'lexique-boursier', title: 'Le Lexique du Boursicoteur' },
  ];
}

export async function fetchArticleById(slug) {
  if (API_BASE_URL) {
    try {
      const res = await axios.get(`${API_BASE_URL}/articles/${slug}`);
      const a = Array.isArray(res.data) ? res.data[0] : res.data;
      if (a) {
        return {
          id: a.id || slug,
          title: a.title || a.name || 'Article',
          contentHtml: a.content_html || a.content || '',
        };
      }
    } catch (_) {}
  }
  // mock fallback
  await new Promise((r) => setTimeout(r, 300));
  const mock = {
    'lexique-boursier': {
      id: 'lexique-boursier',
      title: 'Le Lexique du Boursicoteur',
      contentHtml: `
        <p>Comprendre le langage de la bourse est la première étape vers le succès. Voici quelques termes incontournables :</p>
        <h3 class="text-xl font-bold mt-6 mb-2 text-brand-blue">Action</h3>
        <p>Une action représente une part du capital d'une entreprise...</p>
      `,
    },
  };
  return mock[slug] || { id: slug, title: 'Article non trouvé', contentHtml: '' };
}

export async function fetchRelatedArticles(slug) {
  if (API_BASE_URL) {
    try {
      const list = await fetchArticles();
      return list.filter((a) => a.slug !== slug).slice(0, 5);
    } catch (_) {}
  }
  // mock fallback
  return [
    { id: 'lexique-boursier', title: 'Le Lexique du Boursicoteur' },
    { id: 'premiers-pas-bourse', title: 'Premiers pas en bourse' },
  ];
}

export default { fetchArticles, fetchArticleById, fetchRelatedArticles };
