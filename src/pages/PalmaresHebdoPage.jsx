import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchDailyPalmares } from '../api/marketService';
import { Skeleton } from '../components/common/Skeleton';

const PalmaresHebdoPage = () => {
  const [data, setData] = useState({ gainers: [], losers: [], volumes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    let timer = null;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchDailyPalmares();
        if (!mounted) return;
        setData({
          gainers: res?.gainers || [],
          losers: res?.losers || [],
          volumes: res?.volumes || [],
        });
      } catch (e) {
        if (!mounted) return;
        setError("Impossible de récupérer le palmarès.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();
    timer = setInterval(() => {
      if (!mounted) return;
      fetchDailyPalmares().then((res) => {
        if (!mounted) return;
        setData({
          gainers: res?.gainers || [],
          losers: res?.losers || [],
          volumes: res?.volumes || [],
        });
      }).catch(() => {});
    }, 15000);

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  const renderTable = (title, items, valueKey) => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      {loading ? (
        <div className="p-4 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="px-4 py-4 text-sm text-gray-500">Aucune donnée disponible.</div>
      ) : (
        <ul className="divide-y">
          {items.map((it, idx) => (
            <li key={it.ticker || idx} className="px-4 py-2 text-sm">
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5">
                  <div className="font-semibold text-brand-blue">{it.name || it.ticker}</div>
                  <div className="text-xs text-gray-500">{it.ticker}</div>
                </div>
                <div className="col-span-3 text-right">
                  {it.last_price != null ? it.last_price.toLocaleString('fr-FR') : '-'}
                </div>
                <div className={`col-span-2 text-right ${it.change_pct > 0 ? 'text-green-600' : it.change_pct < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                  {it.change_pct != null ? `${Number(it.change_pct).toFixed(2)} %` : '-'}
                </div>
                <div className="col-span-2 text-right">
                  {valueKey === 'volume'
                    ? (it.volume != null ? it.volume.toLocaleString('fr-FR') : '-')
                    : (it.change_abs != null ? Number(it.change_abs).toFixed(2) : '-')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Marchés</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Palmarès du jour</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-6">Palmarès du jour</h1>
        {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderTable('Plus fortes hausses', data.gainers, 'change_abs')}
          {renderTable('Plus fortes baisses', data.losers, 'change_abs')}
          {renderTable('Plus forts volumes', data.volumes, 'volume')}
        </div>
      </div>
    </div>
  );
};

export default PalmaresHebdoPage;
