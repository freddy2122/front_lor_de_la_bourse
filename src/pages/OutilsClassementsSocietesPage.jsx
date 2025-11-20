import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsClassementsSocietesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Classements des sociétés</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Classements des sociétés (exemples fictifs)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Un outil de classement permet de visualiser rapidement les valeurs en tête ou en queue de
          peloton selon différents critères : rendement, variation, volume, etc. Les tableaux ci-
          dessous donnent des exemples fictifs de ce type de vue.
        </p>

        {/* Classement par rendement */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Top 5 par rendement du dividende</h2>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm mb-2">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Société</th>
                  <th className="px-4 py-2 text-left">Ticker</th>
                  <th className="px-4 py-2 text-right">Rendement</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Sonatel</td>
                  <td className="px-4 py-2 text-gray-700">SONATEL</td>
                  <td className="px-4 py-2 text-right text-green-700 font-semibold">8,6 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Total CI</td>
                  <td className="px-4 py-2 text-gray-700">TOTALCI</td>
                  <td className="px-4 py-2 text-right text-green-700 font-semibold">8,5 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OutilsClassementsSocietesPage;
