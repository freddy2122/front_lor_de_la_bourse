import React from 'react';
import { NavLink } from 'react-router-dom';

const ROWS = [
  {
    sector: 'Banques',
    per: 8.5,
    pbr: 1.2,
  },
  {
    sector: 'Télécoms',
    per: 9.8,
    pbr: 3.1,
  },
  {
    sector: 'Énergie',
    per: 11.0,
    pbr: 2.0,
  },
  {
    sector: 'Agro-industrie',
    per: 7.2,
    pbr: 1.0,
  },
];

const DonneesRatiosParSecteurPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Données</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Ratios par secteur</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Ratios par secteur (exemples fictifs)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Ce tableau illustre la présentation de ratios moyens par secteur (PER, PBR). Les valeurs
          sont fictives et servent uniquement à montrer comment comparer un secteur à un autre.
        </p>

        <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Secteur</th>
                <th className="px-4 py-2 text-right">PER moyen</th>
                <th className="px-4 py-2 text-right">PBR moyen</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((row) => (
                <tr key={row.sector}>
                  <td className="px-4 py-2 text-gray-800">{row.sector}</td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.per.toFixed(1)}</td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.pbr.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Dans une version connectée au backend, ces ratios pourraient être calculés automatiquement
          à partir des données financières agrégées par secteur.
        </p>
      </div>
    </div>
  );
};

export default DonneesRatiosParSecteurPage;
