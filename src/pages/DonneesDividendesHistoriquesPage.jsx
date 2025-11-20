import React from 'react';
import { NavLink } from 'react-router-dom';

const ROWS = [
  {
    year: 2024,
    ticker: 'SONATEL',
    company: 'Sonatel',
    dividend: 1500,
    exDate: '2024-05-10',
    payDate: '2024-06-05',
  },
  {
    year: 2024,
    ticker: 'TOTALCI',
    company: "Total Côte d'Ivoire",
    dividend: 180,
    exDate: '2024-04-20',
    payDate: '2024-05-15',
  },
  {
    year: 2023,
    ticker: 'SONATEL',
    company: 'Sonatel',
    dividend: 1400,
    exDate: '2023-05-12',
    payDate: '2023-06-07',
  },
  {
    year: 2023,
    ticker: 'SOGB',
    company: 'SOGB',
    dividend: 100,
    exDate: '2023-04-05',
    payDate: '2023-04-30',
  },
];

const DonneesDividendesHistoriquesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Données</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Dividendes historiques</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Dividendes historiques (exemples fictifs)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Cette page présente un exemple de tableau de dividendes historiques pour quelques valeurs
          BRVM. Les données sont fictives et servent uniquement à illustrer la structure et les
          informations utiles : montant, date de détachement, date de paiement.
        </p>

        <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Exercice</th>
                <th className="px-4 py-2 text-left">Société</th>
                <th className="px-4 py-2 text-left">Ticker</th>
                <th className="px-4 py-2 text-right">Dividende (FCFA)</th>
                <th className="px-4 py-2 text-left">Date détachement</th>
                <th className="px-4 py-2 text-left">Date paiement</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((row, idx) => (
                <tr key={`${row.ticker}-${row.year}-${idx}`}>
                  <td className="px-4 py-2 text-gray-800">{row.year}</td>
                  <td className="px-4 py-2 text-gray-800">{row.company}</td>
                  <td className="px-4 py-2 text-gray-700">{row.ticker}</td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.dividend.toLocaleString('fr-FR')}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {row.exDate ? new Date(row.exDate).toLocaleDateString('fr-FR') : ''}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {row.payDate ? new Date(row.payDate).toLocaleDateString('fr-FR') : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Pour une utilisation réelle, ces données devraient provenir de publications officielles
          (BRVM, sociétés cotées) et être mises à jour régulièrement.
        </p>
      </div>
    </div>
  );
};

export default DonneesDividendesHistoriquesPage;
