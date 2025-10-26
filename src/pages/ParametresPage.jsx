import React, { useState, useEffect } from 'react';
import { User, Lock, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../api/apiClient';
import { useToast } from '../components/toast/ToastProvider';

const ParametresPage = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const { user, isAuthenticated, updateUser } = useAuth();
  const toast = useToast();

  // Profil form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);
  const [profileError, setProfileError] = useState(null);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPwd, setChangingPwd] = useState(false);
  const [pwdMessage, setPwdMessage] = useState(null);
  const [pwdError, setPwdError] = useState(null);

  // Prefill from auth user
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileMessage(null);
    setProfileError(null);
    try {
      const res = await apiClient.put('/user/profile', { name, email });
      // Le backend renvoie un UserResource
      const updated = res.data?.data || res.data;
      // Màj localStorage pour rester cohérent avec AuthContext
      if (updated) {
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        const nextUser = { ...stored, ...updated };
        localStorage.setItem('user', JSON.stringify(nextUser));
        // Met à jour le contexte pour refléter instantanément
        updateUser(updated);
      }
      setProfileMessage('Profil mis à jour avec succès.');
      toast.success('Profil mis à jour.');
    } catch (e) {
      const msg = e?.response?.data?.message || 'Erreur lors de la mise à jour du profil.';
      setProfileError(msg);
      toast.error(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setChangingPwd(true);
    setPwdMessage(null);
    setPwdError(null);
    try {
      if (newPassword !== confirmPassword) {
        setPwdError('La confirmation ne correspond pas.');
        setChangingPwd(false);
        return;
      }
      await apiClient.post('/user/change-password', {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setPwdMessage('Mot de passe changé avec succès.');
      toast.success('Mot de passe changé.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e) {
      const msg = e?.response?.data?.message || 'Erreur lors du changement de mot de passe.';
      setPwdError(msg);
      toast.error(msg);
    } finally {
      setChangingPwd(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profil':
        return (
          <div>
            <h2 className="text-xl font-bold text-brand-blue mb-4">Informations Personnelles</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700">Nom Complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Adresse Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="email@exemple.com"
                />
              </div>
              {profileError && <p className="text-red-600 text-sm">{profileError}</p>}
              {profileMessage && <p className="text-green-600 text-sm">{profileMessage}</p>}
              <button
                onClick={handleSaveProfile}
                disabled={savingProfile}
                className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg disabled:opacity-60"
              >
                {savingProfile ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        );
      case 'securite':
        return (
          <div>
            <h2 className="text-xl font-bold text-brand-blue mb-4">Sécurité</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">Changer le mot de passe</h3>
                <div className="mt-2 space-y-2">
                  <input
                    type="password"
                    placeholder="Mot de passe actuel"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Confirmer le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  {pwdError && <p className="text-red-600 text-sm">{pwdError}</p>}
                  {pwdMessage && <p className="text-green-600 text-sm">{pwdMessage}</p>}
                  <button
                    onClick={handleChangePassword}
                    disabled={changingPwd}
                    className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg disabled:opacity-60"
                  >
                    {changingPwd ? 'Changement...' : 'Changer'}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <div>
                  <h3 className="font-semibold">Authentification à deux facteurs (2FA)</h3>
                  <p className="text-sm text-gray-600">Protégez votre compte avec une couche de sécurité supplémentaire.</p>
                </div>
                <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg" disabled>À venir</button>
              </div>
            </div>
          </div>
        );
      // Ajoutez d'autres onglets comme 'notifications' si nécessaire
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold font-display text-brand-blue mb-8">Paramètres du Compte</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation par onglets */}
          <div className="md:w-1/4">
            <nav className="space-y-1">
              <TabButton icon={<User />} text="Profil" isActive={activeTab === 'profil'} onClick={() => setActiveTab('profil')} />
              <TabButton icon={<Lock />} text="Sécurité" isActive={activeTab === 'securite'} onClick={() => setActiveTab('securite')} />
              <TabButton icon={<Bell />} text="Notifications" isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
            </nav>
          </div>
          {/* Contenu de l'onglet */}
          <div className="md:w-3/4 bg-white p-6 rounded-xl shadow-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sous-composant pour les boutons d'onglet
const TabButton = ({ icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-lg text-left font-semibold transition-colors ${
      isActive ? 'bg-brand-gold text-brand-blue' : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {React.cloneElement(icon, { size: 20, className: 'mr-3' })}
    {text}
  </button>
);

export default ParametresPage;
