// Admin service: fetch dashboard stats from backend
import apiClient from './apiClient';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchAdminStats() {
  // Utilise apiClient pour bénéficier de l'Authorization automatique
  const res = await apiClient.get('/admin/stats');
  return res.data;
}

export async function fetchPendingKyc() {
  const res = await apiClient.get('/admin/account-opening-requests');
  const items = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
  return items;
}

export async function fetchPendingOrders() {
  const res = await apiClient.get('/admin/orders', { params: { status: 'pending' } });
  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchScrapingStatus() {
  const res = await apiClient.get('/admin/scraping/status');
  return res.data;
}

export async function publishArticle(id) {
  const res = await apiClient.post(`/admin/articles/${id}/publish`);
  return res.data;
}

export async function unpublishArticle(id) {
  const res = await apiClient.post(`/admin/articles/${id}/unpublish`);
  return res.data;
}

export default { fetchAdminStats, fetchPendingKyc, fetchPendingOrders, fetchScrapingStatus, publishArticle, unpublishArticle };

