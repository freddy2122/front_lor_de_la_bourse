import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, User, Landmark, HelpCircle, ArrowRight } from 'lucide-react';

// Sous-composant pour une étape clé
const StepCard = ({ icon, number, title, children }) => (
  <div className="relative pl-12">
    <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 bg-brand-gold text-brand-blue font-bold text-lg rounded-full">
      {number}
    </div>
    <h3 className="text-xl font-bold text-brand-blue mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

// Sous-composant pour une question de la FAQ
const FaqItem = ({ question, children }) => (
  <div className="border-t border-gray-200 pt-4">
    <h4 className="font-semibold text-gray-800">{question}</h4>
    <p className="mt-1 text-gray-600">{children}</p>
  </div>
);

const OuvrirComptePage = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Titre principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Ouvrir votre compte-titres</h1>
          <p className="mt-4 text-lg text-gray-700">
            Rejoignez L'Or de la Bourse en quelques étapes simples et commencez à investir sur le marché régional.
          </p>
        </div>

        {/* Section 1 : Les étapes clés */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">Un processus simple et transparent</h2>
          <div className="space-y-10">
            <StepCard number="1" title="Remplir le formulaire">
              Commencez par remplir notre formulaire d'inscription en ligne avec vos informations personnelles. C'est rapide et sécurisé.
            </StepCard>
            <StepCard number="2" title="Fournir les pièces justificatives">
              Téléversez les documents requis directement sur notre plateforme sécurisée pour la vérification de votre identité (KYC).
            </StepCard>
            <StepCard number="3" title="Effectuer le premier versement">
              Alimentez votre compte-titres par le moyen de votre choix pour commencer à passer vos premiers ordres d'achat.
            </StepCard>
          </div>
        </div>

        {/* Section 2 : Pièces à fournir */}
        <div className="bg-brand-cream p-8 md:p-12 rounded-lg mb-20">
          <h2 className="text-3xl font-bold text-center text-brand-blue mb-10">Pièces à Fournir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-6 bg-white rounded-lg">
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 text-brand-gold mr-3" />
                <h3 className="text-xl font-bold text-brand-blue">Personnes Physiques</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Copie de la pièce d'identité en cours de validité</li>
                <li>Justificatif de domicile de moins de 3 mois</li>
                <li>Photo d'identité récente</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <div className="flex items-center mb-4">
                <Landmark className="w-8 h-8 text-brand-gold mr-3" />
                <h3 className="text-xl font-bold text-brand-blue">Personnes Morales</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Registre de commerce et de crédit mobilier (RCCM)</li>
                <li>Statuts de la société</li>
                <li>Pièce d'identité du ou des dirigeants</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 : FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-brand-blue mb-10">Questions Fréquentes</h2>
          <div className="space-y-6">
            <FaqItem question="Quel est le montant minimum pour ouvrir un compte ?">
              Il n'y a pas de montant minimum requis pour l'ouverture de votre compte. Cependant, pour passer votre premier ordre, vous devrez disposer des fonds nécessaires pour couvrir le coût de l'opération et les frais associés.
            </FaqItem>
            <FaqItem question="Combien de temps prend l'ouverture d'un compte ?">
              Une fois le formulaire rempli et les pièces justificatives soumises, votre compte est généralement validé et ouvert sous 48 heures ouvrées.
            </FaqItem>
          </div>
        </div>

        {/* Appel à l'action final */}
        <div className="text-center">
          <NavLink 
            to="/inscription" 
            className="inline-flex items-center justify-center bg-brand-gold text-brand-blue font-bold py-4 px-10 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <span>Commencer l'inscription en ligne</span>
            <ArrowRight className="ml-3" size={22} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default OuvrirComptePage;
