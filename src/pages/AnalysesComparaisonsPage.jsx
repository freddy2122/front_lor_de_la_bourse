import React from 'react';
import { NavLink } from 'react-router-dom';

const ROWS = [
  {
    ticker: 'SONATEL',
    company: 'Sonatel',
    sector: 'Télécoms',
    price: 17500,
    dividendYield: 8.57,
    per: 9.5,
  },
  {
    ticker: 'TOTALCI',
    company: "Total Côte d'Ivoire",
    sector: 'Énergie',
    price: 2100,
    dividendYield: 8.57,
    per: 10.2,
  },
  {
    ticker: 'SOGB',
    company: 'SOGB',
    sector: 'Agro-industrie',
    price: 3000,
    dividendYield: 4.00,
    per: 7.8,
  },
  {
    ticker: 'NSIA',
    company: 'NSIA Banque CI',
    sector: 'Banques',
    price: 7800,
    dividendYield: 5.20,
    per: 8.9,
  },
];

const AnalysesComparaisonsPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Comparaisons</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Comparer quelques valeurs BRVM sur des indicateurs simples
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Cette page propose un exemple de tableau comparatif entre plusieurs sociétés de la BRVM
          à partir de quelques indicateurs classiques (cours, rendement de dividende, PER, secteur).
          Il s&apos;agit de données fictives destinées uniquement à illustrer l&apos;approche.
        </p>

        {/* Tableau comparatif */}
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg mb-4">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Société</th>
                <th className="px-4 py-2 text-left">Ticker</th>
                <th className="px-4 py-2 text-left">Secteur</th>
                <th className="px-4 py-2 text-right">Cours (FCFA)</th>
                <th className="px-4 py-2 text-right">Rdt dividende</th>
                <th className="px-4 py-2 text-right">PER</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((row) => (
                <tr key={row.ticker}>
                  <td className="px-4 py-2 text-gray-800">{row.company}</td>
                  <td className="px-4 py-2 text-gray-700">{row.ticker}</td>
                  <td className="px-4 py-2 text-gray-700">{row.sector}</td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.price.toLocaleString('fr-FR')}</td>
                  <td
                    className={
                      `px-4 py-2 text-right font-semibold ${row.dividendYield >= 6 ? 'text-green-600' : 'text-gray-800'}`
                    }
                  >
                    {row.dividendYield.toFixed(2)} %
                  </td>
                  <td className="px-4 py-2 text-right text-gray-800">{row.per.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rappels */}
        <p className="text-xs text-gray-500 mb-4">
          Attention : comparer uniquement un ou deux indicateurs peut être trompeur. Il est important
          de replacer ces chiffres dans le contexte (croissance, niveau de risque, liquidité, etc.).
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">Comment utiliser un tableau comparatif</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Identifier les sociétés d&apos;un même secteur pour une comparaison plus cohérente.</li>
            <li>Regarder en même temps le <span className="font-semibold">rendement</span> et le <span className="font-semibold">PER</span>,
              pas l&apos;un sans l&apos;autre.</li>
            <li>Compléter toujours par la lecture des <span className="font-semibold">publications officielles</span>
              et des <span className="font-semibold">rapports d&apos;activité</span>.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalysesComparaisonsPage;
