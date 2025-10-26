import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// Consomme l'API backend: GET /api/articles (voir routes/api.php -> ArticleController)
import contentService from '../api/contentService';

const AnalysesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const list = await contentService.fetchArticles();
        // Normaliser un minimum les champs attendus pour l'affichage
        const norm = (list || []).map((a) => ({
          id: a.slug || a.id,
          slug: a.slug || a.id,
          title: a.title || a.name || 'Article',
          category: a.category || 'Analyse',
          date: a.date || '',
          summary: a.summary || a.excerpt || '',
        }));
        if (mounted) setArticles(norm);
      } catch (e) {
        if (mounted) setError("Impossible de charger les articles.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Actualité & Analyse</h1>
        <p className="mt-4 text-lg text-gray-700">Nos experts partagent leurs perspectives pour éclairer vos choix.</p>
      </div>

      {loading ? (
        <div className="text-gray-500">Chargement…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="space-y-8">
          {articles.map(article => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-brand-blue bg-brand-cream px-3 py-1 rounded-full">{article.category}</span>
                {article.date ? <span className="text-sm text-gray-500">{article.date}</span> : null}
              </div>
              <h2 className="text-2xl font-bold font-display text-brand-blue mb-2">{article.title}</h2>
              {article.summary ? <p className="text-gray-600 mb-4">{article.summary}</p> : null}
              <NavLink to={`/action/${article.slug}`} className="font-bold text-brand-gold hover:underline">
                Lire la suite…
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysesPage;
