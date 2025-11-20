import React from 'react';
import { NavLink } from 'react-router-dom';

const ROWS = [
  {
    ticker: 'SONATEL',
    company: 'Sonatel',
    sector: 'Télécoms',
    per: 9.5,
    roe: 22.0,
    margin: 28.0,
  },
  {
    ticker: 'TOTALCI',
    company: "Total Côte d'Ivoire",
    sector: 'Énergie',
    per: 10.2,
    roe: 18.5,
    margin: 9.5,
  },
  {
    ticker: 'NSIA',
    company: 'NSIA Banque CI',
    sector: 'Banques',
    per: 8.9,
    roe: 17.0,
    margin: 25.0,
  },
  {
    ticker: 'SOGB',
    company: 'SOGB',
    sector: 'Agro-industrie',
    per: 7.8,
    roe: 14.2,
    margin: 12.3,
  },
];

const DonneesRatiosParSocietePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Données</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Ratios par société</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Ratios par société (exemples fictifs)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Ce tableau illustre la présentation de quelques ratios financiers clés par société : PER,
          ROE, marge nette. Les valeurs ci-dessous sont fictives et servent uniquement d&apos;exemple.
        </p>

        <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Société</th>
                <th className="px-4 py-2 text-left">Ticker</th>
                <th className="px-4 py-2 text-left">Secteur</th>
                <th className="px-4 py-2 text-right">PER</th>
                <th className="px-4 py-2 text-right">ROE</th>
                <th className="px-4 py-2 text-right">Marge nette</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((row) => (
                <tr key={row.ticker}>
                  <td className="px-4 py-2 text-gray-800">{row.company}</td>
                  <td className="px-4 py-2 text-gray-700">{row.ticker}</td>
                  <td className="px-4 py-2 text-gray-700">{row.sector}</td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.per.toFixed(1)}</td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.roe.toFixed(1)} %</td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.margin.toFixed(1)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          En pratique, ces ratios seraient calculés à partir des états financiers récents des sociétés
          (bénéfice net, capitaux propres, chiffre d&apos;affaires) et mis à jour régulièrement.
        </p>
      </div>
    </div>
  );
};

export default DonneesRatiosParSocietePage;
