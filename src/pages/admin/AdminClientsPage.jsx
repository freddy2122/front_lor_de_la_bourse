import React, { useEffect, useMemo, useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { useToast } from '../../components/toast/ToastProvider';
import { TableSkeleton } from '../../components/common/Skeleton';

const AdminClientsPage = () => {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(''); // '', 'actif', 'en_attente_kyc', 'bloque'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [meta, setMeta] = useState(null);

  // Debounce simple
  const debouncedSearch = useMemo(() => {
    let t;
    return (value, cb) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => cb(value), 300);
    };
  }, []);

  const fetchClients = async ({ q = search, s = status, p = page, pp = perPage } = {}) => {
    setLoading(true); setError(null);
    try {
      const res = await apiClient.get('/admin/users', { params: { q, status: s, page: p, per_page: pp } });
      const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      const meta = res.data?.meta || null;
      setItems(list);
      setMeta(meta);
    } catch (e) {
      setError(e?.response?.data?.message || 'Erreur lors du chargement des clients.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients({ p: page });
  }, [page]);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value, (term) => {
      setPage(1);
      fetchClients({ q: term, p: 1 });
    });
  };

  const onStatusChange = (e) => {
    const val = e.target.value;
    setStatus(val);
    setPage(1);
    fetchClients({ s: val, p: 1 });
  };

  const onPerPageChange = (e) => {
    const val = Number(e.target.value) || 10;
    setPerPage(val);
    setPage(1);
    fetchClients({ pp: val, p: 1 });
  };

  const changeStatus = async (userId, nextStatus) => {
    if (!userId || !nextStatus) return;
    const ok = window.confirm(`Confirmer le changement de statut en "${nextStatus}" ?`);
    if (!ok) return;
    try {
      await apiClient.patch(`/admin/users/${userId}/status`, { status: nextStatus });
      // refresh current page
      fetchClients();
      toast.success('Statut mis à jour.');
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Erreur lors de la mise à jour du statut.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Clients</h1>
        <button className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          <UserPlus size={20} className="mr-2" /> Ajouter un Client
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou ID..."
            className="w-full pl-10 p-2 border border-gray-300 rounded-lg"
            value={search}
            onChange={onSearchChange}
          />
        </div>
        <select className="ml-4 p-2 border border-gray-300 rounded-lg" value={status} onChange={onStatusChange}>
          <option value="">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="en_attente_kyc">En attente KYC</option>
          <option value="bloque">Bloqué</option>
        </select>
        <select className="ml-4 p-2 border border-gray-300 rounded-lg" value={perPage} onChange={onPerPageChange}>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {/* Tableau des clients */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="p-4">
            <TableSkeleton columns={7} rows={perPage} />
          </div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-gray-500">Aucun client trouvé.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Nom</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Créé le</th>
                <th className="p-3 font-semibold">Rôle</th>
                <th className="p-3 font-semibold">Statut</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono">{u.id}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '-'}</td>
                  <td className="p-3">{u.role || 'client'}</td>
                  <td className="p-3">{u.status || '-'}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-sm text-blue-600 hover:underline">Détails</button>
                    {u.status !== 'bloque' && (
                      <button onClick={() => changeStatus(u.id, 'bloque')} className="text-sm text-red-600 hover:underline">Bloquer</button>
                    )}
                    {u.status === 'bloque' && (
                      <button onClick={() => changeStatus(u.id, 'actif')} className="text-sm text-green-600 hover:underline">Débloquer</button>
                    )}
                    {u.status !== 'en_attente_kyc' && (
                      <button onClick={() => changeStatus(u.id, 'en_attente_kyc')} className="text-sm text-amber-600 hover:underline">Mettre En attente KYC</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {meta ? (
            <span>Page {meta.current_page} / {meta.last_page} • {meta.total} clients</span>
          ) : (
            <span>{items.length} clients</span>
          )}
        </div>
        <div className="space-x-2">
          <button
            disabled={loading || (meta && meta.current_page <= 1)}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            disabled={loading || (meta && meta.current_page >= meta.last_page)}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClientsPage;
