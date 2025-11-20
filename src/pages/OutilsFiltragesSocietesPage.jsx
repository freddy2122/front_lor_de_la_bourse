import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsFiltragesSocietesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Filtrages des sociétés</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Filtrages des sociétés : exemples de critères
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Un outil de filtrage permet de rechercher rapidement des sociétés selon différents
          critères : rendement, secteur, taille, valorisation, etc. Cette page présente quelques
          exemples de filtres possibles sur la BRVM.
        </p>

        {/* Exemples de filtres */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Exemples de filtres de base</h2>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Nom du filtre</th>
                  <th className="px-4 py-2 text-left">Critères</th>
                  <th className="px-4 py-2 text-left">Objectif</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Valeurs de rendement</td>
                  <td className="px-4 py-2 text-gray-700">
                    Rendement du dividende &gt;= 5 %, capitalisation &gt;= 10 milliards FCFA
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    Repérer les sociétés qui distribuent un dividende intéressant avec une taille suffisante.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Valeurs de croissance</td>
                  <td className="px-4 py-2 text-gray-700">
                    Croissance du résultat net &gt; 5 %/an sur 3 ans, marge nette &gt; 10 %
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    Identifier les sociétés qui améliorent régulièrement leurs résultats.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Filtre sectoriel</td>
                  <td className="px-4 py-2 text-gray-700">
                    Secteur = Banques, volume moyen quot. &gt; seuil minimal
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    Se concentrer sur un secteur donné tout en gardant un minimum de liquidité.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OutilsFiltragesSocietesPage;
