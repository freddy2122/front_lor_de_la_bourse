import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchQuotesRealtime } from '../api/marketService';
import { Skeleton } from '../components/common/Skeleton';

const ActionsPage = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: 20, total: 0, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pollIdRef = useRef(null);

  const params = useMemo(() => ({ q, page, per_page: perPage }), [q, page, perPage]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchQuotesRealtime(params);
        if (!mounted) return;
        const data = res?.data ?? [];
        const m = res?.meta ?? { page: 1, per_page: perPage, total: data.length, last_page: 1 };
        setItems(data);
        setMeta(m);
      } catch (_) {
        if (!mounted) return;
        setError("Impossible de récupérer les cours des actions.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();

    // Polling simple toutes les 5s sur la page 1
    clearInterval(pollIdRef.current);
    if (page === 1) {
      pollIdRef.current = setInterval(() => {
        if (!mounted) return;
        fetchQuotesRealtime({ q, page: 1, per_page: perPage })
          .then((res) => {
            const data = res?.data ?? [];
            const m = res?.meta ?? { page: 1, per_page: perPage, total: data.length, last_page: 1 };
            setItems(data);
            setMeta(m);
          })
          .catch(() => {});
      }, 5000);
    }

    return () => {
      mounted = false;
      clearInterval(pollIdRef.current);
    };
  }, [params, q, page, perPage]);

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Marchés</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Actions</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-6">Actions BRVM</h1>

        <div className="bg-brand-cream p-4 md:p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              type="text"
              placeholder="Rechercher une société ou un ticker"
              className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-1/5 mb-2" />
                <Skeleton className="h-5 w-3/5" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-gray-600">Aucun résultat</div>
        ) : (
          <div className="bg-white rounded-lg">
            <div className="hidden md:grid grid-cols-12 px-4 py-3 text-sm font-semibold text-gray-600 border-b">
              <div className="col-span-3">Société</div>
              <div className="col-span-2">Ticker</div>
              <div className="col-span-2 text-right">Dernier cours</div>
              <div className="col-span-2 text-right">Var</div>
              <div className="col-span-1 text-right">Var %</div>
              <div className="col-span-2 text-right">Volume</div>
            </div>
            <ul className="divide-y">
              {items.map((it) => (
                <li key={it.id || it.symbol} className="px-4 py-4">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-12 md:col-span-3 font-semibold text-brand-blue">{it.company || it.name || it.symbol}</div>
                    <div className="col-span-12 md:col-span-2 text-gray-700">{it.symbol || it.ticker}</div>
                    <div className="col-span-6 md:col-span-2 text-right">{it.last != null ? it.last.toLocaleString('fr-FR') : '-'}</div>
                    <div className={`col-span-6 md:col-span-2 text-right ${it.change > 0 ? 'text-green-600' : it.change < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                      {it.change != null ? it.change.toLocaleString('fr-FR') : '-'}
                    </div>
                    <div className={`col-span-6 md:col-span-1 text-right ${it.changePct > 0 ? 'text-green-600' : it.changePct < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                      {it.changePct != null ? `${it.changePct.toFixed(2)} %` : '-'}
                    </div>
                    <div className="col-span-6 md:col-span-2 text-right">{it.volume != null ? it.volume.toLocaleString('fr-FR') : '-'}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between px-4 py-4 border-t mt-2">
              <div className="text-sm text-gray-600">Page {meta.page} sur {meta.last_page} • {meta.total} valeurs</div>
              <div className="flex items-center gap-2">
                <button
                  disabled={meta.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`px-3 py-2 rounded border ${meta.page <= 1 ? 'text-gray-400 border-gray-200' : 'text-brand-blue border-gray-300 hover:bg-gray-50'}`}
                >
                  Précédent
                </button>
                <button
                  disabled={meta.page >= meta.last_page}
                  onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                  className={`px-3 py-2 rounded border ${meta.page >= meta.last_page ? 'text-gray-400 border-gray-200' : 'text-brand-blue border-gray-300 hover:bg-gray-50'}`}
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsPage;
