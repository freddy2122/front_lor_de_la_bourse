import React from 'react';
import { NavLink } from 'react-router-dom';

const ROWS = [
  {
    year: 2024,
    company: 'Sonatel',
    ticker: 'SONATEL',
    type: 'Rapport annuel',
    url: '#',
  },
  {
    year: 2024,
    company: "Total Côte d'Ivoire",
    ticker: 'TOTALCI',
    type: 'Rapport semestriel S1',
    url: '#',
  },
  {
    year: 2023,
    company: 'NSIA Banque CI',
    ticker: 'NSIA',
    type: 'Rapport annuel',
    url: '#',
  },
  {
    year: 2023,
    company: 'SOGB',
    ticker: 'SOGB',
    type: 'Rapport semestriel S1',
    url: '#',
  },
];

const DonneesRapportsActivitePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Données</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Rapports d&apos;activité</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Rapports d&apos;activité (exemples fictifs)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les rapports d&apos;activité (annuels, semestriels) sont une source d&apos;information clé pour
          comprendre la performance et la stratégie des sociétés cotées. Ci-dessous, un exemple de
          tableau listant quelques rapports fictifs pour illustrer la structure.
        </p>

        <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Exercice</th>
                <th className="px-4 py-2 text-left">Société</th>
                <th className="px-4 py-2 text-left">Ticker</th>
                <th className="px-4 py-2 text-left">Type de rapport</th>
                <th className="px-4 py-2 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((row, idx) => (
                <tr key={`${row.ticker}-${row.year}-${idx}`}>
                  <td className="px-4 py-2 text-gray-800">{row.year}</td>
                  <td className="px-4 py-2 text-gray-800">{row.company}</td>
                  <td className="px-4 py-2 text-gray-700">{row.ticker}</td>
                  <td className="px-4 py-2 text-gray-700">{row.type}</td>
                  <td className="px-4 py-2 text-right">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-gold font-semibold hover:underline"
                    >
                      Télécharger
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Pour une intégration réelle, ces liens devraient pointer vers les rapports publiés sur la
          BRVM ou sur les sites officiels des sociétés.
        </p>
      </div>
    </div>
  );
};

export default DonneesRapportsActivitePage;
