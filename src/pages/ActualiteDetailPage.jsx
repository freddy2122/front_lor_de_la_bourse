import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchNewsDetail } from '../api/newsService';

const ActualiteDetailPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const search = new URLSearchParams(location.search);
    const idParam = search.get('id');
    const id = idParam ? decodeURIComponent(idParam) : '';
    if (!id) {
      setError("Actualité introuvable.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchNewsDetail({ id })
      .then((res) => {
        if (!mounted) return;
        setItem(res || null);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Impossible de charger le détail de cette actualité.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [encodedId]);

  const onBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    if (!item) return null;
    if (item.contentHtml) {
      return (
        <div
          className="prose prose-sm md:prose base max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: item.contentHtml }}
        />
      );
    }
    if (item.contentText) {
      return (
        <div className="whitespace-pre-line text-gray-800 text-sm md:text-base">
          {item.contentText}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Marchés</span>
          <span className="mx-2">/</span>
          <NavLink to="/marches/actualites" className="hover:underline">Actualités</NavLink>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Détail</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold font-display text-brand-blue">Détail de l'actualité</h1>
          <button
            onClick={onBack}
            className="text-sm px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Retour
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Chargement...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : !item ? (
          <div className="text-gray-600">Actualité introuvable.</div>
        ) : (
          <div className="bg-brand-cream rounded-lg p-4 md:p-6">
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Société</div>
                <div className="font-semibold text-brand-blue text-sm md:text-base">{item.company}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Date</div>
                <div className="text-gray-700 text-sm md:text-base">
                  {item.date ? new Date(item.date).toLocaleDateString('fr-FR') : ''}
                </div>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{item.title}</h2>

            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm mb-4">
              {renderContent()}
            </div>

            {item.url ? (
              <div className="mt-4 text-xs text-gray-500">
                <span className="mr-1">Source technique :</span>
                <span className="break-all">{item.url}</span>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActualiteDetailPage;
