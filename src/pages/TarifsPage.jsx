import React from 'react';
import { Percent, FileText, Shield } from 'lucide-react';

// Sous-composant pour une ligne de tarif
const TariffRow = ({ category, description, rate }) => (
  <div className="grid grid-cols-3 gap-4 items-center py-4 border-b border-gray-200">
    <div className="col-span-3 md:col-span-1">
      <h3 className="font-bold text-brand-blue">{category}</h3>
    </div>
    <div className="col-span-3 md:col-span-1">
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="col-span-3 md:col-span-1 md:text-right">
      <p className="font-mono font-bold text-lg text-brand-blue">{rate}</p>
    </div>
  </div>
);

const TarifsPage = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Titre principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Nos Tarifs</h1>
          <p className="mt-4 text-lg text-gray-700">
            Une tarification claire, compétitive et sans surprise pour accompagner vos investissements.
          </p>
        </div>

        {/* Tableau des tarifs */}
        <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Percent className="w-8 h-8 text-brand-gold mr-3" />
              <h2 className="text-2xl font-bold text-brand-blue">Frais de Courtage</h2>
            </div>
            <TariffRow 
              category="Actions & Obligations"
              description="Pourcentage appliqué sur le montant total de chaque transaction (achat ou vente)."
              rate="1.5% HT"
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-brand-gold mr-3" />
              <h2 className="text-2xl font-bold text-brand-blue">Droits de Garde</h2>
            </div>
            <TariffRow 
              category="Conservation de titres"
              description="Frais annuels pour la tenue de votre compte-titres."
              rate="0.5% HT de la valeur du portefeuille"
            />
          </div>

          <div>
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-brand-gold mr-3" />
              <h2 className="text-2xl font-bold text-brand-blue">Autres Frais</h2>
            </div>
            <TariffRow 
              category="Gestion sous mandat"
              description="Commission de gestion annuelle pour les portefeuilles gérés par nos experts."
              rate="Sur devis"
            />
            <TariffRow 
              category="Virements sortants"
              description="Frais pour le transfert de vos liquidités vers votre compte bancaire."
              rate="Gratuit"
            />
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-8 max-w-3xl mx-auto">
          Tous les tarifs sont indiqués Hors Taxes. La TVA applicable est de 18%. Pour toute question, n'hésitez pas à nous contacter.
        </p>
      </div>
    </div>
  );
};

export default TarifsPage;
