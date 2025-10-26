import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { useToast } from '../../components/toast/ToastProvider';
import { TableSkeleton } from '../../components/common/Skeleton';
import { publishArticle, unpublishArticle } from '../../api/adminService';

const emptyForm = { title: '', content: '', category: '', status: 'brouillon' };

const AdminArticlesPage = () => {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchArticles = async () => {
    setLoading(true); setError(null);
    try {
      const res = await apiClient.get('/admin/articles');
      const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      setItems(list);
    } catch (e) {
      setError(e?.response?.data?.message || 'Erreur lors du chargement des articles.');
      toast.error(e?.response?.data?.message || 'Erreur lors du chargement des articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (article) => {
    setEditingId(article.id);
    setForm({ title: article.title || '', content: article.content || '', category: article.category || '', status: article.status || 'brouillon' });
    setShowForm(true);
  };

  const saveArticle = async () => {
    setSaving(true);
    try {
      if (!form.title || !form.content || !form.category) {
        toast.error('Veuillez remplir tous les champs.');
        setSaving(false);
        return;
      }
      if (editingId) {
        await apiClient.put(`/admin/articles/${editingId}`, form);
        toast.success('Article mis à jour.');
      } else {
        await apiClient.post('/admin/articles', form);
        toast.success('Article créé.');
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchArticles();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Erreur lors de l\'enregistrement.');
    } finally {
      setSaving(false);
    }
  };

  const deleteArticle = async (id) => {
    if (!id) return;
    const ok = window.confirm('Supprimer cet article ?');
    if (!ok) return;
    try {
      await apiClient.delete(`/admin/articles/${id}`);
      toast.success('Article supprimé.');
      fetchArticles();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Erreur lors de la suppression.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Articles</h1>
        <button onClick={openCreate} className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          <Plus size={18} className="mr-2" /> Nouvel Article
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="p-4">
            <TableSkeleton columns={6} rows={6} />
          </div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-gray-500">Aucun article.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Titre</th>
                <th className="p-3 font-semibold">Catégorie</th>
                <th className="p-3 font-semibold">Statut</th>
                <th className="p-3 font-semibold">Auteur</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono">{a.id}</td>
                  <td className="p-3">{a.title}</td>
                  <td className="p-3">{a.category}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3">{a.author?.name || '-'}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => openEdit(a)} className="inline-flex items-center text-blue-600 hover:underline"><Edit2 size={16} className="mr-1"/>Éditer</button>
                    <button onClick={() => deleteArticle(a.id)} className="inline-flex items-center text-red-600 hover:underline"><Trash2 size={16} className="mr-1"/>Supprimer</button>
                    {a.status === 'brouillon' ? (
                      <button onClick={async () => {
                        try {
                          await publishArticle(a.id);
                          toast.success('Publié');
                          fetchArticles();
                        } catch (e) {
                          toast.error(e?.response?.data?.message || 'Erreur: publication');
                        }
                      }} className="inline-flex items-center text-green-700 hover:underline">Publier</button>
                    ) : (
                      <button onClick={async () => {
                        try {
                          await unpublishArticle(a.id);
                          toast.success('Dépublié');
                          fetchArticles();
                        } catch (e) {
                          toast.error(e?.response?.data?.message || 'Erreur: dépublication');
                        }
                      }} className="inline-flex items-center text-gray-600 hover:underline">Dépublier</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Éditer' : 'Créer'} un article</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Titre</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Catégorie</label>
                <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Statut</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full p-2 border rounded">
                  <option value="brouillon">Brouillon</option>
                  <option value="publie">Publié</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold">Contenu</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full p-2 border rounded" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 border rounded">Annuler</button>
              <button onClick={saveArticle} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticlesPage;
