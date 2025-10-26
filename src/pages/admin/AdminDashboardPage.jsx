import React, { useEffect, useState } from 'react';
import { Users, FileCheck, Clock, BarChartBig } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import adminService, { fetchPendingKyc, fetchPendingOrders, fetchScrapingStatus } from '../../api/adminService';
import { Skeleton } from '../../components/common/Skeleton';

// Sous-composant pour les cartes de statistiques de l'admin
const AdminStatCard = ({ title, value, icon, colorClass }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm">{title}</p>
      </div>
      {React.cloneElement(icon, { size: 40, className: 'opacity-50' })}
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const displayName = (() => {
    const name = user?.name || '';
    if (!name) return 'Administrateur';
    const first = name.trim().split(/\s+/)[0];
    return first || name;
  })();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kycLoading, setKycLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [kycItems, setKycItems] = useState([]);
  const [ordersItems, setOrdersItems] = useState([]);
  const [scraping, setScraping] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const data = await adminService.fetchAdminStats();
        if (mounted) setStats(data);
      } catch (e) {
        if (mounted) setError("Impossible de charger les statistiques.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Monitoring scraping BRVM
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchScrapingStatus();
        if (mounted) setScraping({ loading: false, data, error: null });
      } catch (e) {
        if (mounted) setScraping({ loading: false, data: null, error: "Impossible de charger le statut du scraping." });
      }
    })();
    const id = setInterval(async () => {
      try {
        const data = await fetchScrapingStatus();
        if (mounted) setScraping({ loading: false, data, error: null });
      } catch {}
    }, 30000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  // Charger KYC en attente
  useEffect(() => {
    let mounted = true;
    (async () => {
      setKycLoading(true);
      try {
        const items = await fetchPendingKyc();
        if (mounted) setKycItems(items);
      } catch (_) {
        if (mounted) setKycItems([]);
      } finally {
        if (mounted) setKycLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Charger Ordres en attente
  useEffect(() => {
    let mounted = true;
    (async () => {
      setOrdersLoading(true);
      try {
        const items = await fetchPendingOrders();
        if (mounted) setOrdersItems(items);
      } catch (_) {
        if (mounted) setOrdersItems([]);
      } finally {
        if (mounted) setOrdersLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Note: Ce dashboard devrait avoir son propre layout, différent de celui des clients */}
      <header className="bg-brand-blue text-white p-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Administrateur</h1>
            <p className="text-sm opacity-90">Bienvenue, {displayName}{user?.email ? ` · ${user.email}` : ''}</p>
          </div>
          <a
            href="/admin/parametres"
            className="text-sm font-semibold underline decoration-white/40 hover:decoration-white"
          >
            Modifier mon profil
          </a>
        </div>
      </header>

      <main className="p-8">
        {/* Cartes de KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <>
              <div className="p-6 rounded-lg shadow-md bg-blue-500 text-white"><Skeleton className="h-10 w-24 rounded mb-2" /><Skeleton className="h-4 w-32 rounded" /></div>
              <div className="p-6 rounded-lg shadow-md bg-yellow-500 text-white"><Skeleton className="h-10 w-24 rounded mb-2" /><Skeleton className="h-4 w-32 rounded" /></div>
              <div className="p-6 rounded-lg shadow-md bg-red-500 text-white"><Skeleton className="h-10 w-24 rounded mb-2" /><Skeleton className="h-4 w-32 rounded" /></div>
              <div className="p-6 rounded-lg shadow-md bg-green-500 text-white"><Skeleton className="h-10 w-24 rounded mb-2" /><Skeleton className="h-4 w-32 rounded" /></div>
            </>
          ) : error ? (
            <div className="col-span-4 text-red-600">{error}</div>
          ) : (
            <>
              <AdminStatCard title="Nouveaux Clients (24h)" value={`${stats?.new_clients_24h ?? 0}`} icon={<Users />} colorClass="bg-blue-500" />
              <AdminStatCard title="Comptes à Valider (KYC)" value={`${stats?.kyc_pending_count ?? 0}`} icon={<FileCheck />} colorClass="bg-yellow-500" />
              <AdminStatCard title="Ordres en Attente" value={`${stats?.pending_orders_count ?? 0}`} icon={<Clock />} colorClass="bg-red-500" />
              <AdminStatCard title="Volume Traité (Jour)" value={`${Number(stats?.day_volume ?? 0).toLocaleString('fr-FR')} FCFA`} icon={<BarChartBig />} colorClass="bg-green-500" />
            </>
          )}
        </div>

        {/* Listes de tâches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tâches de validation KYC */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Validations KYC en attente</h2>
            {kycLoading ? (
              <ul className="space-y-3">{Array.from({ length: 3 }).map((_, i) => (<li key={i}><Skeleton className="h-10 w-full rounded" /></li>))}</ul>
            ) : kycItems.length === 0 ? (
              <p className="text-gray-500">Aucune demande en attente.</p>
            ) : (
              <ul className="space-y-3">
                {kycItems.slice(0, 6).map((req) => (
                  <li key={req.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                    <div>
                      <p className="font-semibold">{req.prenom ? `${req.prenom} ${req.nom ?? ''}`.trim() : (req.name || `Demande #${req.id}`)}</p>
                      <p className="text-sm text-gray-500">Soumise le {req.created_at ? new Date(req.created_at).toLocaleDateString('fr-FR') : '—'}</p>
                    </div>
                    <a href={`/admin/kyc`} className="text-sm bg-brand-blue text-white px-3 py-1 rounded">Voir le dossier</a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tâches de gestion des ordres */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ordres à exécuter</h2>
            {ordersLoading ? (
              <ul className="space-y-3">{Array.from({ length: 3 }).map((_, i) => (<li key={i}><Skeleton className="h-10 w-full rounded" /></li>))}</ul>
            ) : ordersItems.length === 0 ? (
              <p className="text-gray-500">Aucun ordre en attente.</p>
            ) : (
              <ul className="space-y-3">
                {ordersItems.slice(0, 6).map((o) => (
                  <li key={o.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                    <div>
                      <p className="font-semibold">{(o.type || 'Ordre')} {o.ticker ? `• ${o.ticker}` : ''} {o.client_name ? `– ${o.client_name}` : ''}</p>
                      <p className="text-sm text-gray-500">{typeof o.amount === 'number' ? `${o.amount.toLocaleString('fr-FR')} FCFA` : ''}</p>
                    </div>
                    <a href={`/admin/ordres`} className="text-sm bg-green-600 text-white px-3 py-1 rounded">Traiter</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Monitoring Scraping BRVM */}
        <div className="mt-8 grid grid-cols-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Statut Scraping BRVM</h2>
            {scraping.loading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-64" />
                <Skeleton className="h-5 w-80" />
              </div>
            ) : scraping.error ? (
              <p className="text-red-600">{scraping.error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Mode</p>
                  <p className="font-semibold">{scraping.data?.mode || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dernière MAJ</p>
                  <p className="font-semibold">{scraping.data?.last_refresh ? new Date(scraping.data.last_refresh).toLocaleString('fr-FR') : '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dernière cote</p>
                  <p className="font-semibold">{scraping.data?.last_quote_at ? new Date(scraping.data.last_quote_at).toLocaleString('fr-FR') : '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Comptes</p>
                  <p className="font-semibold">{Number(scraping.data?.instruments_count ?? 0).toLocaleString('fr-FR')} instruments · {Number(scraping.data?.indices_count ?? 0)} indices · {Number(scraping.data?.quotes_today ?? 0).toLocaleString('fr-FR')} quotes (jour)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
