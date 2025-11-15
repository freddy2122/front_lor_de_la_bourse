// Simple market data service with optional external API and graceful fallback
// Configure via VITE_MARKET_API_BASE and VITE_MARKET_API_KEY

import axios from 'axios';
import apiClient from './apiClient';

const BASE = import.meta.env.VITE_MARKET_API_BASE || '';
const KEY = import.meta.env.VITE_MARKET_API_KEY || '';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Example provider: Alpha Vantage (global stocks/forex/crypto)
// Docs: https://www.alphavantage.co/documentation/
// Note: BRVM coverage may not be available; we use fallback when missing.

export async function fetchTopMovers({ symbols = [] } = {}) {
  // Try backend proxy first
  try {
    const res = await apiClient.get('/market/top-movers', {
      params: symbols.length ? { symbols: symbols.join(',') } : {},
    });
    if (Array.isArray(res.data)) return res.data;
  } catch (_) {
    // fall through to direct provider/mock
  }

  // If no provider configured, return mock
  if (!BASE || !KEY) {
    return [
      { symbol: 'SONATEL', name: 'Sonatel', changePct: 1.45 },
      { symbol: 'TOTALCI', name: 'Total CI', changePct: -0.24 },
      { symbol: 'ECOBANK', name: 'Ecobank', changePct: 2.10 },
    ];
  }

  try {
    // Alpha Vantage GLOBAL_QUOTE per symbol
    const requests = symbols.slice(0, 5).map((sym) =>
      axios.get(BASE, { params: { function: 'GLOBAL_QUOTE', symbol: sym, apikey: KEY } })
    );
    const results = await Promise.allSettled(requests);
    const parsed = results
      .map((r) => (r.status === 'fulfilled' ? r.value?.data : null))
      .map((data) => {
        const q = data?.['Global Quote'];
        if (!q) return null;
        const sym = q['01. symbol'];
        const changePct = parseFloat(q['10. change percent']?.replace('%', '') || '0');
        return { symbol: sym, name: sym, changePct };
      })
      .filter(Boolean);
    if (parsed.length === 0) throw new Error('No data from provider');
    return parsed;
  } catch (e) {
    return [
      { symbol: 'SONATEL', name: 'Sonatel', changePct: 1.45 },
      { symbol: 'TOTALCI', name: 'Total CI', changePct: -0.24 },
      { symbol: 'ECOBANK', name: 'Ecobank', changePct: 2.10 },
    ];
  }
}

// Simple indices fetcher (mock for now). Replace with BRVM indices when available.
export async function fetchIndices() {
  // Try backend proxy first
  try {
    const res = await apiClient.get('/market/indices');
    if (Array.isArray(res.data)) return res.data;
  } catch (_) {}
  // Fallback to mock (global providers usually don’t have BRVM)
  return [
    { symbol: 'BRVM-Composite', name: 'BRVM Composite', changePct: 0.52 },
    { symbol: 'BRVM-30', name: 'BRVM 30', changePct: 0.31 },
    { symbol: 'BRVM-Agri', name: 'BRVM Agriculture', changePct: -0.14 },
  ];
}

export async function fetchQuotesList({ symbols = [] } = {}) {
  try {
    const res = await apiClient.get('/market/quotes-list', {
      params: symbols.length ? { symbols: symbols.join(',') } : {},
    });
    if (Array.isArray(res.data)) return res.data;
  } catch (_) {}
  // Fallback to mock data similar to backend
  return [
    { ticker: 'SONATEL', name: 'Sonatel', price: 17500, change: 1.45, volume: 120500 },
    { ticker: 'TOTALCI', name: "Total Côte d'Ivoire", price: 2100, change: -0.24, volume: 88750 },
    { ticker: 'ECOBANK', name: 'Ecobank Transnational', price: 20, change: 0.00, volume: 540100 },
    { ticker: 'ORAGROUP', name: 'Oragroup Togo', price: 2800, change: 2.15, volume: 45200 },
    { ticker: 'BOAC', name: 'Bank of Africa - CI', price: 6500, change: -1.52, volume: 67300 },
    { ticker: 'CORIS', name: 'Coris Bank Int.', price: 9800, change: 3.10, volume: 31000 },
    { ticker: 'SGC', name: 'Société Générale CI', price: 15200, change: -2.50, volume: 55900 },
  ];
}

// Résumé marché (Activités du marché) — backend: GET /api/market/summary
export async function fetchMarketSummary() {
  try {
    const res = await apiClient.get('/market/summary');
    return res.data;
  } catch (_) {
    return {
      transactions_value_fcfa: null,
      cap_actions_fcfa: null,
      cap_obligations_fcfa: null,
      indices: [],
      last_update: null,
    };
  }
}

export default { fetchTopMovers, fetchIndices, fetchQuotesList, fetchMarketSummary };

// --- Sociétés cotées ---
export async function fetchCompanies({ q = '', sector = '', country = '', page = 1, per_page = 20 } = {}) {
  try {
    const res = await apiClient.get('/market/companies', {
      params: { q, sector, country, page, per_page },
    });
    return res.data;
  } catch (_) {
    return { data: [], meta: { page: 1, per_page: 20, total: 0, last_page: 1 } };
  }
}

export async function fetchCompany(id) {
  if (!id) return null;
  try {
    const res = await apiClient.get(`/market/companies/${id}`);
    return res.data;
  } catch (_) {
    return null;
  }
}
