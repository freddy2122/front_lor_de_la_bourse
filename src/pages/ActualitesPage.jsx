import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchNews } from '../api/newsService';
import { Skeleton } from '../components/common/Skeleton';
import apiClient from '../api/apiClient';

const ActualitesPage = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: 10, total: 0, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshingRef = useRef(false);
  const debounceRef = useRef(null);

  const params = useMemo(() => ({ q, page, per_page: perPage }), [q, page, perPage]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchNews(params)
      .then((res) => {
        if (!mounted) return;
        const data = res?.data ?? [];
        const m = res?.meta ?? { page: 1, per_page: perPage, total: data.length, last_page: 1 };
        setItems(data);
        setMeta(m);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Impossible de récupérer les actualités.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [params]);

  useEffect(() => {
    if (page !== 1) return;
    const API_BASE_URL = (apiClient?.defaults?.baseURL || import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
    let es = null;
    let pollId = null;
    let stopped = false;

    const refresh = async () => {
      if (refreshingRef.current) return;
      refreshingRef.current = true;
      try {
        const res = await fetchNews({ q, page: 1, per_page: perPage });
        if (stopped) return;
        const data = res?.data ?? [];
        const m = res?.meta ?? { page: 1, per_page: perPage, total: data.length, last_page: 1 };
        setItems(data);
        setMeta(m);
      } catch (_) {
      } finally {
        refreshingRef.current = false;
      }
    };

    const scheduleRefresh = () => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (!stopped && page === 1) refresh();
      }, 1200);
    };

    const startPolling = () => {
      clearInterval(pollId);
      pollId = setInterval(() => {
        if (stopped || page !== 1) return;
        refresh();
      }, 5000);
    };

    if (API_BASE_URL) {
      try {
        let streamUrl = `${API_BASE_URL}/market/news/stream`;
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (token) streamUrl += `?token=${encodeURIComponent(token)}`;
        es = new EventSource(streamUrl, { withCredentials: false });
        es.onmessage = () => { if (!stopped) scheduleRefresh(); };
        es.onerror = () => { try { es.close(); } catch {} startPolling(); };
      } catch (_) {
        startPolling();
      }
    } else {
      startPolling();
    }

    return () => {
      stopped = true;
      try { es && es.close(); } catch {}
      clearInterval(pollId);
      clearTimeout(debounceRef.current);
    };
  }, [q, page, perPage]);

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Marchés</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Actualités</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-6">Actualités BRVM</h1>

        <div className="bg-brand-cream p-4 md:p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} type="text" placeholder="Rechercher" className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold" />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Société</div>
              <div className="col-span-7">Titre</div>
              <div className="col-span-1 text-right">Lien</div>
            </div>
            <ul className="divide-y">
              {items.map((it) => (
                <li key={it.id} className="px-4 py-4">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-12 md:col-span-2 text-gray-600">{it.date ? new Date(it.date).toLocaleDateString('fr-FR') : ''}</div>
                    <div className="col-span-12 md:col-span-2 font-semibold text-brand-blue">{it.company}</div>
                    <div className="col-span-12 md:col-span-7">{it.title}</div>
                    <div className="col-span-12 md:col-span-1 text-right">
                      <a href={it.url || '#'} target="_blank" rel="noreferrer" className="text-brand-gold font-bold hover:underline">Ouvrir</a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between px-4 py-4 border-t mt-2">
              <div className="text-sm text-gray-600">Page {meta.page} sur {meta.last_page} • {meta.total} résultats</div>
              <div className="flex items-center gap-2">
                <button disabled={meta.page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className={`px-3 py-2 rounded border ${meta.page <= 1 ? 'text-gray-400 border-gray-200' : 'text-brand-blue border-gray-300 hover:bg-gray-50'}`}>Précédent</button>
                <button disabled={meta.page >= meta.last_page} onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))} className={`px-3 py-2 rounded border ${meta.page >= meta.last_page ? 'text-gray-400 border-gray-200' : 'text-brand-blue border-gray-300 hover:bg-gray-50'}`}>Suivant</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActualitesPage;
