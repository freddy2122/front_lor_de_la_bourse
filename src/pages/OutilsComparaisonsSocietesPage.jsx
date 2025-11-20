import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsComparaisonsSocietesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Comparaisons des sociétés</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Comparer plusieurs sociétés BRVM côte à côte
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Un outil de comparaison permet d&apos;afficher plusieurs sociétés sur une même ligne de
          lecture : cours, rendement, PER, secteur. Le tableau ci-dessous est un exemple fictif de
          ce type de vue.
        </p>

        <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Société</th>
                <th className="px-4 py-2 text-left">Ticker</th>
                <th className="px-4 py-2 text-left">Secteur</th>
                <th className="px-4 py-2 text-right">Cours (FCFA)</th>
                <th className="px-4 py-2 text-right">Rendement</th>
                <th className="px-4 py-2 text-right">PER</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 text-gray-800">Sonatel</td>
                <td className="px-4 py-2 text-gray-700">SONATEL</td>
                <td className="px-4 py-2 text-gray-700">Télécoms</td>
                <td className="px-4 py-2 text-right text-gray-800">17 500</td>
                <td className="px-4 py-2 text-right text-green-700 font-semibold">8,6 %</td>
                <td className="px-4 py-2 text-right text-gray-800">9,5</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-800">Total CI</td>
                <td className="px-4 py-2 text-gray-700">TOTALCI</td>
                <td className="px-4 py-2 text-gray-700">Énergie</td>
                <td className="px-4 py-2 text-right text-gray-800">2 100</td>
                <td className="px-4 py-2 text-right text-green-700 font-semibold">8,5 %</td>
                <td className="px-4 py-2 text-right text-gray-800">10,2</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-800">SOGB</td>
                <td className="px-4 py-2 text-gray-700">SOGB</td>
                <td className="px-4 py-2 text-gray-700">Agro-industrie</td>
                <td className="px-4 py-2 text-right text-gray-800">3 000</td>
                <td className="px-4 py-2 text-right text-gray-800">4,0 %</td>
                <td className="px-4 py-2 text-right text-gray-800">7,8</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          En pratique, un outil complet permettrait de choisir les sociétés à comparer et les
          indicateurs affichés, puis de sauvegarder des comparaisons fréquentes.
        </p>
      </div>
    </div>
  );
};

export default OutilsComparaisonsSocietesPage;
