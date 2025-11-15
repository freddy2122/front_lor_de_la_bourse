// Créez ce nouveau fichier : src/components/home/AccountOpeningCard.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserPlus, FileText } from 'lucide-react';

// Un sous-composant pour les petites cartes d'analyse
const AnalysisPreviewCard = ({ title }) => (
  <div className="bg-brand-cream p-4 rounded-lg flex-1 hover:shadow-md transition-shadow">
    <FileText className="w-6 h-6 text-brand-gold mb-2" />
    <a href="#" className="font-semibold text-sm text-brand-blue hover:underline">
      {title}
    </a>
  </div>
);

const AccountOpeningCard = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full">
      {/* Section Ouverture de Compte */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h3 className="font-display text-3xl font-bold text-brand-blue mb-2">Ouverture de compte</h3>
        <p className="text-gray-600 mb-4">
          Devenez investisseur chez L'Or de la Bourse.
        </p>
        <NavLink 
          to="/inscription" // ou une future page "/inscription"
          className="inline-flex items-center bg-brand-gold text-brand-blue font-bold py-2 px-5 rounded-full hover:bg-opacity-90 transition-all"
        >
          <UserPlus size={20} className="mr-2" />
          <span>Ouvrir un compte</span>
        </NavLink>
      </div>

      {/* Section Analyse */}
      <div>
        <h3 className="font-display text-3xl font-bold text-brand-blue mb-4">Analyse</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <AnalysisPreviewCard title="Le secteur bancaire de l'UEMOA en pleine mutation" />
          <AnalysisPreviewCard title="SONATEL : Analyse des résultats du T2 2025" />
        </div>
      </div>
    </div>
  );
};

export default AccountOpeningCard;
