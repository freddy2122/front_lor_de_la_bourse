import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchIndices } from '../api/marketService';
import { Skeleton } from '../components/common/Skeleton';

const IndicesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchIndices();
        if (!mounted) return;
        const data = Array.isArray(res) ? res : [];
        setItems(data);
      } catch (_) {
        if (!mounted) return;
        setError("Impossible de récupérer les indices.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const latestUpdate = items.reduce((max, it) => {
    if (!it.lastUpdate) return max;
    return it.lastUpdate > max ? it.lastUpdate : max;
  }, '');

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Marchés</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Indices</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-2">Indices BRVM</h1>
        {latestUpdate && (
          <div className="text-xs text-gray-500 mb-4">
            Dernière mise à jour : {new Date(latestUpdate).toLocaleString('fr-FR')}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-1/5 mb-2" />
                <Skeleton className="h-5 w-3/5" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-gray-600">Aucun indice disponible</div>
        ) : (
          <div className="bg-white rounded-lg">
            <div className="hidden md:grid grid-cols-12 px-4 py-3 text-sm font-semibold text-gray-600 border-b">
              <div className="col-span-4">Indice</div>
              <div className="col-span-2 text-right">Ouverture</div>
              <div className="col-span-2 text-right">Dernier</div>
              <div className="col-span-2 text-right">Clôture préc.</div>
              <div className="col-span-1 text-right">Var pts</div>
              <div className="col-span-1 text-right">Var %</div>
            </div>
            <ul className="divide-y">
              {items.map((it, idx) => (
                <li key={it.symbol || it.name || idx} className="px-4 py-4">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-12 md:col-span-4">
                      <div className="font-semibold text-brand-blue">{it.name || it.symbol}</div>
                      <div className="text-xs text-gray-500">{it.symbol}</div>
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right">{it.open != null ? it.open.toLocaleString('fr-FR') : '-'}</div>
                    <div className="col-span-4 md:col-span-2 text-right">{it.value != null ? it.value.toLocaleString('fr-FR') : '-'}</div>
                    <div className="hidden md:block md:col-span-2 text-right">{it.prevClose != null ? it.prevClose.toLocaleString('fr-FR') : '-'}</div>
                    <div className={`col-span-4 md:col-span-1 text-right ${it.changeAbs > 0 ? 'text-green-600' : it.changeAbs < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                      {it.changeAbs != null ? Number(it.changeAbs).toFixed(2) : '-'}
                    </div>
                    <div className={`col-span-4 md:col-span-1 text-right ${it.changePct > 0 ? 'text-green-600' : it.changePct < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                      {it.changePct != null ? `${Number(it.changePct).toFixed(2)} %` : '-'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndicesPage;
