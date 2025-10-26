import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
// Consomme l'API backend: GET /api/market/quotes-list (voir MarketController::quotesList)
import { fetchQuotesList } from '../api/marketService';
import { TableSkeleton } from '../components/common/Skeleton';

const ChangePill = ({ change }) => {
  const up = Number(change) >= 0;
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full ${up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {up ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
      {`${up ? '+' : ''}${Number(change).toFixed(2)}%`}
    </span>
  );
};

const MarchePage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // BRVM: laisser vide pour récupérer les dernières cotes disponibles en base via l'API
  // Backend: GET /api/market/quotes-list (sans param symbols) → renvoie les quotes récentes persistées
  const symbols = useMemo(() => [], []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const data = await fetchQuotesList({ symbols });
        if (mounted) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError('Impossible de charger les cours.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [symbols]);

  const topGainers = useMemo(() => [...rows].sort((a, b) => b.change - a.change).slice(0, 3), [rows]);
  const topLosers = useMemo(() => [...rows].sort((a, b) => a.change - b.change).slice(0, 3), [rows]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Le Marché en Direct</h1>
        <p className="mt-4 text-lg text-gray-700">Suivez les tendances (démo). Bientôt: BRVM.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-16 overflow-x-auto">
        {loading ? (
          <TableSkeleton columns={4} rows={8} />
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-100">
              <tr>
                <th className="p-4 font-bold text-brand-blue">Nom</th>
                <th className="p-4 font-bold text-brand-blue text-right">Dernier Cours</th>
                <th className="p-4 font-bold text-brand-blue text-center">Variation</th>
                <th className="p-4 font-bold text-brand-blue text-right">Volume</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((stock) => (
                <tr key={stock.ticker} className="border-b border-gray-100 hover:bg-brand-cream transition-colors">
                  <td className="p-4 font-semibold">
                    <NavLink to={`/action/${stock.ticker}`} className="text-brand-blue hover:text-brand-gold hover:underline">
                      {stock.name}
                    </NavLink>
                  </td>
                  <td className="p-4 font-mono text-right">{Number(stock.price || 0).toLocaleString('fr-FR')}</td>
                  <td className="p-4 text-center">
                    <ChangePill change={stock.change} />
                  </td>
                  <td className="p-4 font-mono text-right">{Number(stock.volume || 0).toLocaleString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-brand-blue mb-4">Top Gainers</h3>
          {loading ? (
            <TableSkeleton columns={3} rows={3} />
          ) : (
            <ul className="space-y-2">
              {topGainers.map((g) => (
                <li key={g.ticker} className="flex justify-between">
                  <span className="font-semibold">{g.name}</span>
                  <ChangePill change={g.change} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-brand-blue mb-4">Top Losers</h3>
          {loading ? (
            <TableSkeleton columns={3} rows={3} />
          ) : (
            <ul className="space-y-2">
              {topLosers.map((g) => (
                <li key={g.ticker} className="flex justify-between">
                  <span className="font-semibold">{g.name}</span>
                  <ChangePill change={g.change} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarchePage;
