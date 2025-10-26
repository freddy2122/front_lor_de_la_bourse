import React, { useState, useEffect } from 'react';
import { FileCheck, X, Check } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { useToast } from '../../components/toast/ToastProvider';
import { CardSkeleton } from '../../components/common/Skeleton';

const AdminKycPage = () => {
  const toast = useToast();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pour le rejet
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const fetchKycRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/admin/account-opening-requests');
      // Le backend renvoie désormais des Resources Laravel => { data: [...] }
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data?.data ?? []);
      setRequests(items);
    } catch (err) {
      console.error("Erreur récupération KYC:", err.response?.data || err);
      setError("Impossible de charger les demandes.");
      toast.error("Impossible de charger les demandes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKycRequests();
  }, []);

  // --- APPROBATION ---
  const handleApprove = async (id) => {
    if (!id) return console.error("ID de la demande KYC invalide !");
    console.log("Tentative d'approbation pour ID:", id);

    try {
      const res = await apiClient.post(`/admin/account-opening-requests/${id}/approve`);
      console.log("Réponse approbation:", res.data);
      fetchKycRequests();
      toast.success('Demande approuvée.');
    } catch (err) {
      console.error("Erreur approbation:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Erreur lors de l'approbation.");
    }
  };

  // --- REJET ---
  const openRejectModal = (id) => {
    setSelectedRequestId(id);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedRequestId) return console.error("ID de la demande KYC invalide !");
    console.log("Tentative de rejet pour ID:", selectedRequestId, "Raison:", rejectReason);

    try {
      const res = await apiClient.post(`/admin/account-opening-requests/${selectedRequestId}/reject`, {
        reason: rejectReason,
      });
      console.log("Réponse rejet:", res.data);
      setShowRejectModal(false);
      fetchKycRequests();
      toast.success('Demande rejetée.');
    } catch (err) {
      console.error("Erreur rejet:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Erreur lors du rejet.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-8">
        <h1 className="text-2xl font-bold mb-6">Validations KYC</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} lines={3} showActions />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">Validations KYC</h1>

      {requests.length === 0 ? (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
          <FileCheck size={48} className="mx-auto text-green-500" />
          <p className="mt-4 font-semibold text-lg text-gray-700">Aucune demande en attente.</p>
          <p className="text-gray-500">Toutes les demandes ont été traitées.</p>
        </div>
      ) : (
        requests.map(req => (
          <div key={req.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <p className="font-bold">{req.prenom} {req.nom}</p>
            <p>Email: {req.email}</p>
            <p>Téléphone: {req.telephone}</p>
            <p>Adresse: {req.adresse} , {req.ville}</p>
            <p>Nationalité: {req.nationalite}</p>
            <p>Pays de résidence: {req.pays_residence}</p>

            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => openRejectModal(req.id)} 
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                <X size={16} className="mr-2"/> Rejeter
              </button>
              <button 
                onClick={() => handleApprove(req.id)} 
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                <Check size={16} className="mr-2"/> Approuver
              </button>
            </div>
          </div>
        ))
      )}

      {/* --- MODAL REJET --- */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Motif du rejet</h2>
            <textarea
              className="w-full border rounded p-2 mb-4"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Indiquez la raison du rejet"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowRejectModal(false)} 
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Annuler
              </button>
              <button 
                onClick={handleRejectConfirm} 
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirmer le rejet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKycPage;
