import { useEffect, useRef, useState } from 'react';
import apiClient from '../api/apiClient';

// Hook SSE avec fallback polling REST
export default function useMarketStream({ symbols = ['BRVM10', 'SONATEL', 'BOAC', 'CORIS'], pollIntervalMs = 3000 } = {}) {
  const [data, setData] = useState({ source: 'mock', realtime: true, quotes: {} });
  const [status, setStatus] = useState('connecting'); // connecting | live | fallback | error
  const esRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams({ symbols: symbols.join(',') });
    const url = `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/market/stream?${params.toString()}`;

    try {
      const es = new EventSource(url, { withCredentials: false });
      esRef.current = es;

      es.onopen = () => {
        setStatus('live');
      };
      es.onerror = () => {
        // bascule vers polling si SSE échoue
        setStatus('fallback');
        es.close();
        startPolling();
      };
      es.addEventListener('quotes', (evt) => {
        try {
          const payload = JSON.parse(evt.data);
          const next = { ...data.quotes };
          (payload.data || []).forEach((q) => {
            next[q.symbol] = q;
          });
          setData({ source: payload.source, realtime: payload.realtime, quotes: next });
        } catch {}
      });
    } catch (_e) {
      setStatus('fallback');
      startPolling();
    }

    function startPolling() {
      clearInterval(pollRef.current);
      pollRef.current = setInterval(async () => {
        try {
          const res = await apiClient.get('/market/quotes', { params: { symbols: symbols.join(',') } });
          const next = {};
          (res.data?.data || []).forEach((q) => {
            next[q.symbol] = q;
          });
          setData({ source: res.data?.source || 'mock', realtime: false, quotes: next });
        } catch (e) {
          setStatus('error');
          clearInterval(pollRef.current);
        }
      }, pollIntervalMs);
    }

    return () => {
      try { esRef.current && esRef.current.close(); } catch {}
      clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols.join(','), pollIntervalMs]);

  return { data, status };
}
