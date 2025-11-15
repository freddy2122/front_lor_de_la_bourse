import axios from 'axios';
import { navigateTo } from '../routes/navigation';

// Instance Axios globale
const apiClient = axios.create({
  // Utilise la variable d'env VITE_API_BASE_URL (définie dans .env.*) avec repli sur l'URL locale
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api', // ✅ point d'entrée unique de l’API
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête : ajoute le token si présent
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Gestion du refresh token ---
let isRefreshing = false;
let refreshPromise = null;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

const refreshAuthToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) throw new Error('No refresh token');

  // Utiliser une instance axios sans intercepteurs pour éviter les boucles
  const baseURL = apiClient.defaults.baseURL;
  const plainAxios = axios.create({ baseURL, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } });
  const response = await plainAxios.post('/auth/refresh', { refresh_token });
  const { token: newToken, refresh_token: newRefresh } = response.data || {};
  if (!newToken) throw new Error('No token returned by refresh');

  // Mettre à jour le storage et les headers par défaut
  localStorage.setItem('auth_token', newToken);
  if (newRefresh) localStorage.setItem('refresh_token', newRefresh);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  return newToken;
};

// Intercepteur de réponse : erreurs globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const originalRequest = error.config || {};
      if (error.response.status === 401) {
        // Eviter les boucles de retry
        if (originalRequest._retry) {
          // Le token a déjà été rafraîchi mais la requête échoue encore → on se déconnecte
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            navigateTo('/login', { replace: true });
          }
          return Promise.reject(error);
        }

        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) {
          // Pas de refresh token → déconnexion
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            navigateTo('/login', { replace: true });
          }
          return Promise.reject(error);
        }

        // Marquer la requête pour éviter des boucles
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAuthToken()
            .then((newToken) => {
              onRefreshed(newToken);
              return newToken;
            })
            .catch((refreshErr) => {
              console.error('Erreur lors du refresh token:', refreshErr);
              // Nettoyage et redirection
              localStorage.removeItem('auth_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('user');
              if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                navigateTo('/login', { replace: true });
              }
              throw refreshErr;
            })
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
            });
        }

        // Mettre en attente la requête courante jusqu'à ce que le token soit rafraîchi
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            try {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              resolve(apiClient(originalRequest));
            } catch (e) {
              reject(e);
            }
          });

          // En parallèle, s'assurer qu'on attend bien la promesse de refresh démarrée
          if (refreshPromise) {
            refreshPromise.catch(reject);
          }
        });
      }
      if (error.response.status === 403) {
        console.error("⛔ Erreur 403 : Accès refusé.");
      }
    } else {
      console.error("🌐 Erreur réseau :", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
