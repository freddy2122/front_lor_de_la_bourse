import React from 'react';
import { NavLink } from 'react-router-dom';

const EXAMPLES = [
  {
    ticker: 'SONATEL',
    company: 'Sonatel',
    lastPrice: 17500,
    dividend: 1500,
    yieldPct: 8.57,
  },
  {
    ticker: 'TOTALCI',
    company: "Total Côte d'Ivoire",
    lastPrice: 2100,
    dividend: 180,
    yieldPct: 8.57,
  },
  {
    ticker: 'SOGB',
    company: 'SOGB',
    lastPrice: 3000,
    dividend: 120,
    yieldPct: 4.00,
  },
];

const AnalysesDividendesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Dividendes</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Comprendre et analyser les dividendes à la BRVM
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les dividendes représentent une partie du bénéfice distribuée aux actionnaires. Sur la BRVM,
          certaines valeurs se distinguent par un historique de distribution régulier. Cette page
          présente les notions clés à connaître pour analyser un rendement de dividende, sans
          constituer une recommandation d&apos;investissement.
        </p>

        {/* Section notions de base */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Notions de base</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>
              <span className="font-semibold">Dividende par action</span> : montant versé pour chaque action détenue
              (exprimé en FCFA).
            </li>
            <li>
              <span className="font-semibold">Rendement du dividende</span> : dividende par action / cours de l&apos;action,
              exprimé en %. Permet de comparer des valeurs entre elles.
            </li>
            <li>
              <span className="font-semibold">Politique de dividende</span> : habitudes de la société (montant stable,
              croissant, distribution exceptionnelle, etc.).
            </li>
          </ul>
        </section>

        {/* Section dates clés */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Dates clés autour du dividende</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>
              <span className="font-semibold">Date d&apos;annonce</span> : la société communique le montant proposé et les
              dates importantes via une publication officielle.
            </li>
            <li>
              <span className="font-semibold">Date de détachement</span> : à partir de cette séance, l&apos;action est cotée
              « hors dividende » (le cours s&apos;ajuste généralement à la baisse du montant du dividende).
            </li>
            <li>
              <span className="font-semibold">Date de mise en paiement</span> : le dividende est effectivement versé aux
              actionnaires qui détenaient l&apos;action à la date de référence.
            </li>
          </ul>
        </section>

        {/* Section exemples chiffrés */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Exemples de rendements (données fictives)</h2>
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Société</th>
                  <th className="px-4 py-2 text-left">Ticker</th>
                  <th className="px-4 py-2 text-right">Cours (FCFA)</th>
                  <th className="px-4 py-2 text-right">Dividende (FCFA)</th>
                  <th className="px-4 py-2 text-right">Rendement</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {EXAMPLES.map((row) => (
                  <tr key={row.ticker}>
                    <td className="px-4 py-2 text-gray-800">{row.company}</td>
                    <td className="px-4 py-2 text-gray-700">{row.ticker}</td>
                    <td className="px-4 py-2 text-right text-gray-800">{row.lastPrice.toLocaleString('fr-FR')}</td>
                    <td className="px-4 py-2 text-right text-gray-800">{row.dividend.toLocaleString('fr-FR')}</td>
                    <td
                      className={
                        `px-4 py-2 text-right font-semibold ${row.yieldPct >= 6 ? 'text-green-600' : 'text-gray-800'}`
                      }
                    >
                      {row.yieldPct.toFixed(2)} %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ces chiffres sont purement illustratifs. Le rendement réel varie en fonction du cours et
            des décisions de la société.
          </p>
        </section>

        {/* Section points de vigilance */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">4. Points de vigilance</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Un rendement très élevé peut être le signe d&apos;un cours déprimé ou d&apos;un dividende non durable.</li>
            <li>Regarder l&apos;historique des dividendes sur plusieurs années, pas seulement la dernière année.</li>
            <li>Ne pas se baser uniquement sur le dividende : la performance totale inclut aussi l&apos;évolution du cours.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalysesDividendesPage;
