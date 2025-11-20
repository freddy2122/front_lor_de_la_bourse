import React from 'react';
import { NavLink } from 'react-router-dom';

const PremiumPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Premium</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Espace Premium (bientôt disponible)
        </h1>
        <p className="text-gray-700 mb-4 max-w-3xl">
          L&apos;offre Premium pourra proposer des analyses approfondies, des alertes avancées, des
          rapports exclusifs et des outils de suivi supplémentaires. Cette section est pour
          l&apos;instant un squelette statique en attendant la définition finale de l&apos;offre.
        </p>
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 text-sm">
          L&apos;espace Premium n&apos;est pas encore activé. Les détails de l&apos;offre seront communiqués
          ultérieurement.
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
