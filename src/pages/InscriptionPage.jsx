import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import apiClient from '../api/apiClient';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale';
import { useToast } from '../components/toast/ToastProvider';
import { Skeleton, SkeletonText } from '../components/common/Skeleton';

const Toast = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 2; // 50 étapes -> 5s
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg w-80">
      <p>{message}</p>
      <div className="h-1 bg-green-300 mt-2 rounded">
        <div
          className="h-1 bg-white rounded"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        ></div>
      </div>
    </div>
  );
};

const InscriptionPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    nom: '', prenom: '', date_naissance: '',
    nationalite: '', pays_residence: '',
    adresse: '', ville: '', telephone: '', email: '',
  });
  const [phoneCountry, setPhoneCountry] = useState({ countryCode: 'bj', dialCode: '229' });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [todayStr, setTodayStr] = useState('');
  const [todayDate, setTodayDate] = useState(new Date());

  // Prefill pays/nationalité en fonction de la locale navigateur (meilleure UX)
  useEffect(() => {
    // Calcul de la date d'aujourd'hui au format yyyy-mm-dd
    try {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      setTodayStr(`${yyyy}-${mm}-${dd}`);
      setTodayDate(today);
    } catch (_) {}

    try {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale || navigator.language || 'fr-FR';
      // Chercher la partie région (FR, BJ, etc.)
      const region = (locale.split('-')[1] || '').toUpperCase();
      if (region) {
        const regionName = new Intl.DisplayNames(['fr'], { type: 'region' }).of(region);
        setFormData((prev) => ({
          ...prev,
          nationalite: prev.nationalite || regionName || prev.nationalite,
          pays_residence: prev.pays_residence || regionName || prev.pays_residence,
        }));
      }
    } catch (_) {
      // silencieux si Intl non supporté
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Validation immédiate par champ
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(String(value).trim())) {
        setErrors(prev => ({ ...prev, email: ['Adresse email invalide'] }));
      } else {
        setErrors(prev => ({ ...prev, email: null }));
      }
    } else if (name === 'date_naissance') {
      if (todayStr && String(value) > todayStr) {
        setErrors(prev => ({ ...prev, date_naissance: ["La date de naissance ne peut pas être future"] }));
      } else {
        setErrors(prev => ({ ...prev, date_naissance: null }));
      }
    } else if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    let pendingToastId = null;
    try {
      pendingToastId = toast.info('Envoi en cours…', { duration: 0 });
    } catch (_) {}

    // Normaliser le téléphone au format E.164 (+229XXXXXXXX)
    const rawPhone = String(formData.telephone || '').trim();
    const normalizedPhone = rawPhone ? (rawPhone.startsWith('+') ? rawPhone : `+${rawPhone}`) : '';

    // Validation simple côté client pour éviter un aller/retour inutile
    if (!/^\+\d{8,15}$/.test(normalizedPhone)) {
      setErrors((prev) => ({ ...prev, telephone: ['Numéro de téléphone invalide'] }));
      setIsLoading(false);
      return;
    }

    const payload = { ...formData, telephone: normalizedPhone };

    const dataToSend = new FormData();
    Object.entries(payload).forEach(([k, v]) => dataToSend.append(k, v));

    try {
      await apiClient.post('/auth/account-opening-requests', dataToSend, {
        headers: { Accept: 'application/json' },
      });

      setShowToast(true);

      // Redirection après 5s
      setTimeout(() => {
        navigate('/');
      }, 5000);

    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: 'Une erreur inattendue est survenue. Veuillez réessayer.' });
        console.error('Erreur de soumission:', err);
      }
    } finally {
      setIsLoading(false);
      if (pendingToastId) {
        try { toast.remove(pendingToastId); } catch (_) {}
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-brand-blue">Ouverture de Compte-Titres</h1>
        <p className="mt-2 text-gray-600">Un processus simple et sécurisé.</p>
      </div>

      <div className="relative">
        {/* Overlay de chargement pendant la soumission */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] rounded-lg flex flex-col p-6">
            <div className="mb-4">
              <Skeleton className="h-5 w-56 rounded" />
            </div>
            <div className="space-y-3">
              <SkeletonText lines={3} />
              <SkeletonText lines={2} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-10 rounded" />
                <Skeleton className="h-10 rounded" />
              </div>
              <Skeleton className="h-40 rounded" />
              <Skeleton className="h-12 rounded" />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow-md p-4 sm:p-6" aria-busy={isLoading}>

        {/* Nom & Prénom */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold">Nom</label>
            <input
              type="text" name="nom" value={formData.nom} required
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nom && <p className="text-xs text-red-600 mt-1">{errors.nom[0]}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold">Prénom(s)</label>
            <input
              type="text" name="prenom" value={formData.prenom} required
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.prenom && <p className="text-xs text-red-600 mt-1">{errors.prenom[0]}</p>}
          </div>
        </div>

        {/* Date et lieu de naissance */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold">Date de naissance</label>
            <DatePicker
              selected={formData.date_naissance ? new Date(formData.date_naissance) : null}
              onChange={(date) => {
                // stocker en yyyy-mm-dd
                if (date instanceof Date && !isNaN(date)) {
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                  const dd = String(date.getDate()).padStart(2, '0');
                  handleChange({ target: { name: 'date_naissance', value: `${yyyy}-${mm}-${dd}` } });
                } else {
                  handleChange({ target: { name: 'date_naissance', value: '' } });
                }
              }}
              locale={fr}
              dateFormat="dd/MM/yyyy"
              maxDate={todayDate}
              placeholderText="jj/mm/aaaa"
              className={`w-full p-2 border rounded ${errors.date_naissance ? 'border-red-500' : 'border-gray-300'}`}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              isClearable
            />
            <p className="text-xs text-gray-500 mt-1">La date ne peut pas être dans le futur.</p>
            {errors.date_naissance && <p className="text-xs text-red-600 mt-1">{errors.date_naissance[0]}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">Adresse Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-gold ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            <p className="text-xs text-gray-500 mt-1">Format: nom@domaine.tld</p>
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email[0]}</p>}
          </div>
        </div>

        {/* Nationalité & Pays */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold">Nationalité</label>
            <input
              type="text" name="nationalite" value={formData.nationalite} required
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.nationalite ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nationalite && <p className="text-xs text-red-600 mt-1">{errors.nationalite[0]}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold">Pays de résidence</label>
            <input
              type="text" name="pays_residence" value={formData.pays_residence} required
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.pays_residence ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.pays_residence && <p className="text-xs text-red-600 mt-1">{errors.pays_residence[0]}</p>}
          </div>
        </div>

        {/* Adresse & Ville */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold">Adresse complète</label>
            <input
              type="text" name="adresse" value={formData.adresse} required
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.adresse ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.adresse && <p className="text-xs text-red-600 mt-1">{errors.adresse[0]}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold">Ville</label>
            <input
              type="text" name="ville" value={formData.ville} required
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.ville ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.ville && <p className="text-xs text-red-600 mt-1">{errors.ville[0]}</p>}
          </div>
        </div>

        {/* Email & Téléphone */}
        <div className="w-full">
          <label className="block text-sm font-bold mb-1">Numéro de Téléphone</label>
          <PhoneInput
            country="bj"
            value={formData.telephone}
            onChange={(phone, country) => {
              setFormData(prev => ({ ...prev, telephone: phone }));
              if (country) {
                setPhoneCountry({ countryCode: country.countryCode, dialCode: country.dialCode });
                // Pré-remplir nationalité et pays de résidence selon le pays choisi
                try {
                  const region = (country.countryCode || '').toUpperCase();
                  const regionName = new Intl.DisplayNames(['fr'], { type: 'region' }).of(region);
                  setFormData(prev => ({
                    ...prev,
                    nationalite: prev.nationalite || regionName || prev.nationalite,
                    pays_residence: prev.pays_residence || regionName || prev.pays_residence,
                  }));
                } catch (_) {}
              }
              if (errors.telephone) setErrors(prev => ({ ...prev, telephone: null }));
            }}
            containerClass="w-full"
            inputClass={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-gold ${errors.telephone ? 'border-red-500' : 'border-gray-300'
              }`}
            buttonClass="rounded-l-md"
            isValid={(value, country) => {
              // Validation de longueur minimale/maximum (8-15 chiffres en tout, sans +)
              const digits = String(value || '').replace(/\D/g, '');
              return digits.length >= 8 && digits.length <= 15;
            }}
          />
          <p className="text-xs text-gray-500 mt-1">
            Format attendu: +{phoneCountry.dialCode} suivi du numéro. Exemple: +{phoneCountry.dialCode} 12345678
          </p>
          {errors.telephone && <p className="text-xs text-red-600 mt-1">{errors.telephone[0]}</p>}
        </div>


        {/* Bouton Soumettre */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg"
        >
          {isLoading ? 'Envoi en cours...' : 'Soumettre la demande'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <NavLink to="/login" className="font-bold text-brand-blue hover:text-brand-gold">
            Connectez-vous
          </NavLink>
        </p>

        {errors.general && <p className="text-red-600 text-center mt-2">{errors.general}</p>}
      </form>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast
          message="Votre demande a été envoyée à l'admin. Vous allez recevoir un email. Redirection vers l'accueil..."
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default InscriptionPage;
