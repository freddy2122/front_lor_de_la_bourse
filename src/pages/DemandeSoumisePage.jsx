import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import SuccessToast from '../components/common/SuccessToast';
import { MailCheck } from 'lucide-react';

const DemandeSoumisePage = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(true);

  // Gère la redirection lorsque le toast disparaît
  useEffect(() => {
    if (!showToast) {
      navigate('/'); // Redirige vers la page d'accueil
    }
  }, [showToast, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream p-4 text-center">
      
      {/* Affiche le toast de notification */}
      {showToast && (
        <SuccessToast
          message="Votre dossier est en cours d'examen. Vous recevrez un email de confirmation une fois validé."
          duration={7000} // 7 secondes
          onDismiss={() => setShowToast(false)}
        />
      )}

      {/* Contenu principal de la page */}
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg animate-fade-in">
        <MailCheck className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold font-display text-brand-blue">Merci ! Votre demande a bien été reçue.</h1>
        <p className="mt-4 text-gray-700">
          Notre équipe va maintenant examiner les informations et les documents que vous nous avez fournis.
          Ce processus peut prendre jusqu'à 48 heures.
        </p>
        <p className="mt-2 text-gray-700">
          Vous recevrez un email de notre part dès que votre compte sera validé, avec vos identifiants pour vous connecter.
        </p>
        <div className="mt-8">
          <NavLink 
            to="/" 
            className="bg-brand-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Retourner à l'accueil
          </NavLink>
        </div>
      </div>

    </div>
  );
};

export default DemandeSoumisePage;
