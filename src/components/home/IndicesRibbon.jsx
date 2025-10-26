import React, { useEffect, useState } from 'react';
// Consomme l'API backend: GET /api/market/indices (voir MarketController::indices)
import marketService from '../../api/marketService';
import { Skeleton } from '../common/Skeleton';

const IndicesRibbon = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const data = await marketService.fetchIndices();
        if (mounted) setIndices(data);
      } catch (e) {
        if (mounted) setError('Impossible de charger les indices.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-white border-y">
      <div className="container mx-auto px-4 py-3">
        {loading ? (
          <div className="flex gap-6 overflow-x-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[220px]">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="h-4 w-10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <div className="flex gap-6 overflow-x-auto">
            {indices.map((idx) => {
              const up = idx.changePct >= 0;
              const change = `${up ? '+' : ''}${idx.changePct.toFixed(2)}%`;
              return (
                <div key={idx.symbol} className="min-w-[220px]">
                  <div className="text-sm text-gray-500">{idx.name}</div>
                  <div className={`text-base font-semibold ${up ? 'text-green-600' : 'text-red-600'}`}>{change}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndicesRibbon;
