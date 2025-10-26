import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DollarSign, BarChart2, Calendar, Briefcase } from 'lucide-react';
// Consomme l'API backend: GET /api/market/quotes-list?symbols=TICKER (voir MarketController::quotesList)
import marketService, { fetchCompany } from '../api/marketService';
// Tentative d'affichage d'article: GET /api/articles/{slug}
import contentService from '../api/contentService';
import { Skeleton, SkeletonText } from '../components/common/Skeleton';

const ActionDetailPage = () => {
  const { ticker } = useParams();
  const [data, setData] = useState(null);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        // 1) Essayer d'abord de charger un ARTICLE si le paramètre est un slug d'article
        // Route publique: GET /api/articles/{slug}
        if (ticker) {
          const art = await contentService.fetchArticleById(ticker);
          if (art && (art.contentHtml || '').trim().length > 0) {
            if (mounted) {
              setArticle(art);
              setLoading(false);
            }
            return; // Affichage article, on ne continue pas sur la fiche action
          }
        }

        // 2) Fallback fiche ACTION (BRVM)
        // BRVM: récupérer la dernière cote pour ce ticker depuis la base via l'API marché
        // Normaliser en MAJUSCULES pour correspondre aux tickers en DB (ex: "SONATEL", "TOTALCI")
        const norm = ticker ? ticker.toUpperCase() : null;
        const res = await marketService.fetchQuotesList({ symbols: norm ? [norm] : [] });
        const first = Array.isArray(res) && res.length ? res[0] : null;

        // Charger les infos société (secteur, capi, rendement, description)
        const company = norm ? await fetchCompany(norm) : null;

        if (!first && !company) {
          if (mounted) setData({ name: ticker || 'Action', sector: '—', price: 0, change: 0, marketCap: '—', dividendYield: '—', summary: "Données indisponibles pour le moment." });
        } else {
          if (mounted) setData({
            name: (first?.name || company?.name || ticker),
            sector: company?.sector || '—',
            price: first?.price ?? 0,
            change: first?.change ?? 0,
            volume: first?.volume ?? 0,
            marketCap: typeof company?.market_cap_fcfa === 'number' ? company.market_cap_fcfa.toLocaleString('fr-FR') + ' FCFA' : '—',
            dividendYield: typeof company?.dividend_yield_pct === 'number' ? company.dividend_yield_pct.toFixed(2) + ' %' : '—',
            summary: company?.description || "Résumé de l'entreprise non disponible pour la démo.",
          });
        }
      } catch (e) {
        if (mounted) setError("Impossible de charger les informations de l'action.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [ticker]);

  return (
    <div className="bg-brand-cream py-16">
      <div className="container mx-auto px-4">
        {/* Affichage ARTICLE si disponible */}
        {article ? (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold font-display text-brand-blue mb-6">{article.title}</h1>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          </div>
        ) : (
        <>
        {/* En-tête */}
        {loading ? (
          <div className="flex justify-between items-start mb-8">
            <div>
              <Skeleton className="h-10 w-80 rounded" />
              <Skeleton className="h-4 w-40 mt-2 rounded" />
            </div>
            <div className="text-right">
              <Skeleton className="h-10 w-40 rounded" />
              <Skeleton className="h-6 w-20 mt-2 rounded" />
            </div>
          </div>
        ) : error ? (
          <div className="mb-8 text-red-600">{error}</div>
        ) : (
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold font-display text-brand-blue">{data?.name} ({ticker})</h1>
              <p className="text-lg text-gray-600">{data?.sector}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-mono font-bold text-brand-blue">{Number(data?.price || 0).toLocaleString('fr-FR')}</p>
              <p className={`text-xl font-semibold ${Number(data?.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(data?.change) > 0 ? '+' : ''}{Number(data?.change).toFixed(2)}%
              </p>
            </div>
          </div>
        )}

        {/* Grille d'informations clés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <Skeleton className="h-4 w-24 mb-2 rounded" />
                <Skeleton className="h-6 w-28 rounded" />
              </div>
            ))
          ) : (
            <>
              <InfoCard icon={<DollarSign />} title="Capitalisation" value={data?.marketCap || '—'} />
              <InfoCard icon={<BarChart2 />} title="Rendement Dividende" value={data?.dividendYield || '—'} />
              <InfoCard icon={<Calendar />} title="Prochain Résultat" value="—" />
              <InfoCard icon={<Briefcase />} title="Volume (24h)" value={typeof data?.volume === 'number' ? data.volume.toLocaleString('fr-FR') : '—'} />
            </>
          )}
        </div>

        {/* Graphique et Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-brand-blue mb-4">Graphique du Cours</h2>
            {loading ? (
              <Skeleton className="h-96 w-full rounded" />
            ) : (
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">[Graphique interactif à intégrer]</p>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-brand-blue mb-4">À Propos de l'Entreprise</h2>
            {loading ? (
              <SkeletonText lines={5} />
            ) : (
              <p className="text-gray-700">{data?.summary}</p>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

// Petit sous-composant pour les cartes d'info
const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center text-gray-500 mb-1">
      {React.cloneElement(icon, { size: 16, className: 'mr-2' })}
      <h4 className="text-sm font-semibold">{title}</h4>
    </div>
    <p className="text-2xl font-bold text-brand-blue">{value}</p>
  </div>
);

export default ActionDetailPage;
