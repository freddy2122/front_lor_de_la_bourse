import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchOfficialPublications } from '../api/publicationsService';
import { fetchCompanies } from '../api/marketService';
import { Skeleton } from '../components/common/Skeleton';

const typeOptions = [
  { value: '', label: 'Tous les types' },
  { value: 'rapport', label: 'Rapports' },
  { value: 'avis', label: 'Avis' },
  { value: 'dividende', label: 'Dividendes' },
];

const PublicationsOfficiellesPage = () => {
  const [q, setQ] = useState('');
  const [symbol, setSymbol] = useState('');
  const [symbolInput, setSymbolInput] = useState('');
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: 10, total: 0, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sort, setSort] = useState('date_desc');

  const params = useMemo(() => ({ q, symbol, type, from, to, page, per_page: perPage }), [q, symbol, type, from, to, page, perPage]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchOfficialPublications(params)
      .then((res) => {
        if (!mounted) return;
        let data = res?.data ?? [];
        if (sort === 'date_desc') {
          data = [...data].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
        } else if (sort === 'date_asc') {
          data = [...data].sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
        }
        const m = res?.meta ?? { page: 1, per_page: perPage, total: data.length, last_page: 1 };
        setItems(data);
        setMeta(m);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Impossible de récupérer les publications officielles.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [params, sort]);

  useEffect(() => {
    let mounted = true;
    const qv = symbolInput.trim();
    if (qv.length < 2) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    fetchCompanies({ q: qv, per_page: 5 })
      .then((res) => {
        if (!mounted) return;
        const data = res?.data ?? [];
        setSuggestions(data);
      })
      .catch(() => {
        if (!mounted) return;
        setSuggestions([]);
      });
    return () => {
      mounted = false;
      controller.abort?.();
    };
  }, [symbolInput]);

  const onFilterChange = (fn) => (e) => {
    fn(e.target.value);
    setPage(1);
  };

  const onReset = () => {
    setQ('');
    setSymbol('');
    setSymbolInput('');
    setType('');
    setFrom('');
    setTo('');
    setPage(1);
  };

  const setPresetDays = (days) => {
    const d = new Date();
    const toStr = d.toISOString().slice(0, 10);
    d.setDate(d.getDate() - days);
    const fromStr = d.toISOString().slice(0, 10);
    setFrom(fromStr);
    setTo(toStr);
    setPage(1);
  };

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Marchés</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Publications officielles</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-6">Publications officielles de la BRVM</h1>

        <div className="bg-brand-cream p-4 md:p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <input value={q} onChange={onFilterChange(setQ)} type="text" placeholder="Rechercher" className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold" />
            <div className="relative">
              <input
                value={symbolInput}
                onChange={(e) => { setSymbolInput(e.target.value); setSymbol(e.target.value); setPage(1); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                type="text"
                placeholder="Société"
                className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 left-0 right-0 bg-white border border-gray-200 rounded shadow">
                  {suggestions.map((c) => {
                    const label = c.name || c.ticker || c.symbol || '';
                    return (
                      <button
                        key={(c.id ?? label) + ''}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => { setSymbol(label); setSymbolInput(label); setShowSuggestions(false); setPage(1); }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <select value={type} onChange={onFilterChange(setType)} className="w-full px-3 py-2 rounded border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold">
              {typeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <input value={from} onChange={onFilterChange(setFrom)} type="date" className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold" />
            <input value={to} onChange={onFilterChange(setTo)} type="date" className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold" />
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className="w-full px-3 py-2 rounded border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold">
              <option value="date_desc">Plus récentes</option>
              <option value="date_asc">Plus anciennes</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button onClick={onReset} className="px-4 py-2 rounded bg-white border border-gray-200 hover:bg-gray-50">Réinitialiser</button>
            <button onClick={() => setPresetDays(7)} className="px-3 py-2 text-sm rounded bg-white border border-gray-200 hover:bg-gray-50">7 jours</button>
            <button onClick={() => setPresetDays(30)} className="px-3 py-2 text-sm rounded bg-white border border-gray-200 hover:bg-gray-50">30 jours</button>
            <button onClick={() => setPresetDays(90)} className="px-3 py-2 text-sm rounded bg-white border border-gray-200 hover:bg-gray-50">3 mois</button>
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
              <div className="col-span-6">Titre</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-1 text-right">PDF</div>
            </div>
            <ul className="divide-y">
              {items.map((it) => (
                <li key={it.id} className="px-4 py-4">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-12 md:col-span-2 text-gray-600">{new Date(it.date).toLocaleDateString('fr-FR')}</div>
                    <div className="col-span-12 md:col-span-2 font-semibold text-brand-blue">{it.company}</div>
                    <div className="col-span-12 md:col-span-6">{it.title}</div>
                    <div className="col-span-6 md:col-span-1"><span className="inline-block text-xs font-bold px-2 py-1 rounded bg-brand-cream text-brand-blue uppercase">{it.type}</span></div>
                    <div className="col-span-6 md:col-span-1 text-right">
                      <a href={it.pdf_url || '#'} target="_blank" rel="noreferrer" className="text-brand-gold font-bold hover:underline">Ouvrir</a>
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

export default PublicationsOfficiellesPage;
