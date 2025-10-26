import React, { useEffect, useState } from 'react';
import { Settings, Shield, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/apiClient';
import { useToast } from '../../components/toast/ToastProvider';

const AdminParametresPage = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();

  // Profil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  // Mot de passe
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [pwdMsg, setPwdMsg] = useState(null);
  const [pwdErr, setPwdErr] = useState(null);
  const [changingPwd, setChangingPwd] = useState(false);

  // Taux de commission
  const [fee, setFee] = useState('');
  const [feeMsg, setFeeMsg] = useState(null);
  const [feeErr, setFeeErr] = useState(null);
  const [savingFee, setSavingFee] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true); setMsg(null); setErr(null);
    try {
      const res = await apiClient.put('/user/profile', { name, email });
      const updated = res.data?.data || res.data;
      if (updated) {
        // localStorage + contexte
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        const nextUser = { ...stored, ...updated };
        localStorage.setItem('user', JSON.stringify(nextUser));
        updateUser(updated);
      }
      setMsg('Profil administrateur mis à jour.');
      toast.success('Profil administrateur mis à jour.');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Erreur lors de la mise à jour du profil.');
      toast.error(e?.response?.data?.message || 'Erreur lors de la mise à jour du profil.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setChangingPwd(true); setPwdMsg(null); setPwdErr(null);
    try {
      if (password !== passwordConfirmation) {
        setPwdErr('La confirmation ne correspond pas.');
        setChangingPwd(false);
        return;
      }
      await apiClient.post('/user/change-password', {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });
      setPwdMsg('Mot de passe administrateur changé.');
      toast.success('Mot de passe administrateur changé.');
      setCurrentPassword(''); setPassword(''); setPasswordConfirmation('');
    } catch (e) {
      setPwdErr(e?.response?.data?.message || 'Erreur lors du changement de mot de passe.');
      toast.error(e?.response?.data?.message || 'Erreur lors du changement de mot de passe.');
    } finally {
      setChangingPwd(false);
    }
  };

  // Charger le taux de commission au montage
  useEffect(() => {
    const loadFee = async () => {
      try {
        const res = await apiClient.get('/admin/settings/fees');
        const value = res.data?.value ?? '';
        setFee(value);
      } catch (e) {
        console.error('Erreur chargement taux:', e?.response?.data || e);
      }
    };
    loadFee();
  }, []);

  const handleSaveFee = async () => {
    setSavingFee(true); setFeeMsg(null); setFeeErr(null);
    try {
      const val = parseFloat(String(fee).replace(',', '.'));
      if (isNaN(val) || val < 0 || val > 100) {
        setFeeErr('Veuillez saisir un pourcentage valide entre 0 et 100.');
        setSavingFee(false);
        return;
      }
      await apiClient.put('/admin/settings/fees', { value: val });
      setFee(String(val));
      setFeeMsg('Taux de commission mis à jour.');
    } catch (e) {
      setFeeErr(e?.response?.data?.message || 'Erreur lors de la mise à jour du taux.');
    } finally {
      setSavingFee(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6 justify-between">
        <div className="flex items-center">
          <Settings size={32} className="text-gray-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Paramètres Administrateur</h1>
        </div>
        <span className="inline-flex items-center text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
          <Shield size={14} className="mr-1" /> Rôle: {user?.role || 'admin'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Taux de commission */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-brand-blue mb-4">Taux de commission</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="p-2 border rounded w-32"
            />
            <span className="font-semibold">%</span>
            <button
              onClick={handleSaveFee}
              disabled={savingFee}
              className="bg-brand-blue text-white font-bold py-2 px-6 rounded disabled:opacity-60"
            >
              {savingFee ? 'Enregistrement...' : 'Mettre à jour'}
            </button>
          </div>
          {feeErr && <p className="text-sm text-red-600 mt-2">{feeErr}</p>}
          {feeMsg && <p className="text-sm text-green-600 mt-2">{feeMsg}</p>}
        </div>

        {/* Profil */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-brand-blue mb-4">Profil</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            {msg && <p className="text-sm text-green-600">{msg}</p>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-blue text-white font-bold py-2 px-6 rounded disabled:opacity-60"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-brand-blue mb-4 flex items-center"><Lock size={18} className="mr-2"/>Sécurité</h2>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Mot de passe actuel"
              className="w-full p-2 border rounded"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              className="w-full p-2 border rounded"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {pwdErr && <p className="text-sm text-red-600">{pwdErr}</p>}
            {pwdMsg && <p className="text-sm text-green-600">{pwdMsg}</p>}
            <button
              onClick={handleChangePassword}
              disabled={changingPwd}
              className="bg-brand-blue text-white font-bold py-2 px-6 rounded disabled:opacity-60"
            >
              {changingPwd ? 'Changement...' : 'Changer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminParametresPage;
