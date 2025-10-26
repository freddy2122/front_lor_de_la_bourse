import React, { useEffect, useState } from 'react';
// Consomme l'API backend: GET /api/market/summary (voir MarketController::summary)
import marketService, { fetchMarketSummary } from '../../api/marketService';
import { Skeleton } from '../common/Skeleton';

const Kpi = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-bold text-brand-blue mt-1">{value}</div>
  </div>
);

const MarketSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const res = await fetchMarketSummary();
        if (mounted) setData(res);
      } catch (e) {
        if (mounted) setError("Impossible de charger le résumé du marché.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const fmtMoney = (n) => (typeof n === 'number' ? n.toLocaleString('fr-FR') + ' FCFA' : '—');

  return (
    <section className="bg-white border-y">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-brand-blue mb-4">Activités du marché</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded" />
            ))}
          </div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Kpi label="Valeur des transactions" value={fmtMoney(data?.transactions_value_fcfa)} />
              <Kpi label="Capitalisation Actions" value={fmtMoney(data?.cap_actions_fcfa)} />
              <Kpi label="Capitalisation Obligations" value={fmtMoney(data?.cap_obligations_fcfa)} />
            </div>

            {/* Mini-Indices (issus de /api/market/summary → indices) */}
            <div className="flex gap-6 overflow-x-auto">
              {(data?.indices || []).map((idx) => {
                const up = typeof idx.changePct === 'number' ? idx.changePct >= 0 : true;
                const change = typeof idx.changePct === 'number' ? `${up ? '+' : ''}${idx.changePct.toFixed(2)}%` : '—';
                return (
                  <div key={idx.symbol} className="min-w-[220px]">
                    <div className="text-sm text-gray-500">{idx.name || idx.symbol}</div>
                    <div className="text-base text-gray-800">{typeof idx.value === 'number' ? idx.value.toLocaleString('fr-FR') : '—'}</div>
                    <div className={`text-sm font-semibold ${up ? 'text-green-600' : 'text-red-600'}`}>{change}</div>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-gray-500 mt-3">
              Dernière mise à jour : {data?.last_update ? new Date(data.last_update).toLocaleString('fr-FR') : '—'}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MarketSummary;
