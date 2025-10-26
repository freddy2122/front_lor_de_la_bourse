import React, { useEffect, useMemo, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
// Consomme l'API backend: GET /api/market/quotes-list (voir MarketController::quotesList)
import { fetchQuotesList } from '../../api/marketService';

const MarketTicker = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // BRVM: laisser vide pour récupérer les dernières cotes persistées en base via l'API
    const symbols = useMemo(() => [], []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const data = await fetchQuotesList({ symbols });
                if (!mounted) return;
                const mapped = (Array.isArray(data) ? data : []).map((r) => {
                    const pct = Number(r.change || 0);
                    const sign = pct > 0 ? '+' : '';
                    return {
                        name: r.ticker || r.name || '',
                        value: typeof r.price === 'number' ? r.price.toLocaleString('fr-FR') : String(r.price ?? ''),
                        change: `${sign}${pct.toFixed(2)}%`,
                        up: pct > 0,
                        flat: pct === 0,
                    };
                });
                setItems(mapped);
            } catch (_) {
                if (!mounted) return;
                setItems([]);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        const id = setInterval(async () => {
            try {
                const data = await fetchQuotesList({ symbols });
                if (!mounted) return;
                const mapped = (Array.isArray(data) ? data : []).map((r) => {
                    const pct = Number(r.change || 0);
                    const sign = pct > 0 ? '+' : '';
                    return {
                        name: r.ticker || r.name || '',
                        value: typeof r.price === 'number' ? r.price.toLocaleString('fr-FR') : String(r.price ?? ''),
                        change: `${sign}${pct.toFixed(2)}%`,
                        up: pct > 0,
                        flat: pct === 0,
                    };
                });
                setItems(mapped);
            } catch {}
        }, 30000);
        return () => { mounted = false; clearInterval(id); };
    }, [symbols]);

    const list = items.length ? items : [];

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center py-2 overflow-x-auto whitespace-nowrap">
                    {(loading && list.length === 0 ? Array.from({ length: 6 }).map((_, i) => ({ name: '—', value: '—', change: '—', up: true, flat: true, _k: i })) : list).map((ticker, idx) => (
                        <div key={`${ticker.name}-${idx}`} className="inline-flex items-center space-x-4 px-4">
                            <span className="font-semibold text-sm text-gray-700">{ticker.name}</span>
                            <div className="flex items-center">
                                <span className="font-mono text-brand-blue">{ticker.value}</span>
                                <div className={`flex items-center ml-2 text-xs font-bold ${ticker.flat ? 'text-gray-500' : (ticker.up ? 'text-green-600' : 'text-red-600')}`}>
                                    {ticker.flat ? null : (ticker.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
                                    <span className="ml-1">{ticker.change}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketTicker;
