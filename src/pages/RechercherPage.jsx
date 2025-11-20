import React from 'react';
import { NavLink } from 'react-router-dom';

const RechercherPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Rechercher</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Rechercher (version statique)
        </h1>
        <p className="text-gray-700 mb-4 max-w-3xl">
          Cette page accueillera à terme un moteur de recherche pour les sociétés, les actualités,
          les rapports et les outils. Pour le moment, elle présente simplement un champ de recherche
          sans logique de résultats.
        </p>
        <div className="max-w-xl mb-6">
          <input
            type="text"
            placeholder="Rechercher une société, un ticker, une actualité..."
            className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <p className="text-xs text-gray-500">
          La fonctionnalité de recherche sera implémentée plus tard (côté backend et/ou frontend).
        </p>
      </div>
    </div>
  );
};

export default RechercherPage;
