import React from 'react';
import { NavLink } from 'react-router-dom';

const ROWS = [
  { ticker: 'SONATEL', company: 'Sonatel', country: 'Sénégal', sector: 'Télécoms' },
  { ticker: 'TOTALCI', company: "Total Côte d'Ivoire", country: 'Côte d\'Ivoire', sector: 'Énergie' },
  { ticker: 'NSIA', company: 'NSIA Banque CI', country: 'Côte d\'Ivoire', sector: 'Banques' },
  { ticker: 'SOGB', company: 'SOGB', country: 'Côte d\'Ivoire', sector: 'Agro-industrie' },
];

const ApprendreListeSocietesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Apprendre</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Liste des sociétés cotées</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Liste des sociétés cotées (exemples BRVM)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Ci-dessous, un exemple simplifié de liste des sociétés cotées à la BRVM, avec leur ticker,
          pays et secteur. En version complète, cette page permettrait de filtrer, trier et accéder
          au détail de chaque société.
        </p>

        <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Société</th>
                <th className="px-4 py-2 text-left">Ticker</th>
                <th className="px-4 py-2 text-left">Pays</th>
                <th className="px-4 py-2 text-left">Secteur</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((row) => (
                <tr key={row.ticker}>
                  <td className="px-4 py-2 text-gray-800">{row.company}</td>
                  <td className="px-4 py-2 text-gray-700">{row.ticker}</td>
                  <td className="px-4 py-2 text-gray-700">{row.country}</td>
                  <td className="px-4 py-2 text-gray-700">{row.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprendreListeSocietesPage;
