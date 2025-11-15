// Créez ce nouveau fichier : src/components/home/MarketInfoCard.jsx

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import marketService from '../../api/marketService';
import { Skeleton, SkeletonText } from '../common/Skeleton';

const MarketInfoCard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        // Provide a list of symbols if using a provider like Alpha Vantage (demo only)
        const data = await marketService.fetchTopMovers({ symbols: ['AAPL', 'MSFT', 'GOOGL'] });
        if (mounted) setItems(data);
      } catch (e) {
        if (mounted) setError('Impossible de récupérer les données du marché.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full">
      <h3 className="font-display text-3xl font-bold text-brand-blue mb-2">Marché</h3>
      <p className="text-gray-600 mb-6">Cours en temps quasi-réel des actions et obligations.</p>

      {loading ? (
        <div className="space-y-4 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mb-6 text-sm text-red-600">{error}</div>
      ) : (
        <div className="space-y-4 mb-6">
          {items.map((s) => {
            const dir = s.changePct >= 0 ? 'up' : 'down';
            const change = `${s.changePct > 0 ? '+' : ''}${s.changePct.toFixed(2)}%`;
            return (
              <div key={s.symbol} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                <span className="font-semibold text-gray-800">{s.name || s.symbol}</span>
                <div className={`flex items-center font-bold ${dir === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {dir === 'up' ? <TrendingUp size={18} className="mr-2" /> : <TrendingDown size={18} className="mr-2" />}
                  <span>{change}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <NavLink to="/marches/actions" className="font-bold text-brand-gold hover:underline">
        Voir tous les cours →
      </NavLink>
    </div>
  );
};

export default MarketInfoCard;
