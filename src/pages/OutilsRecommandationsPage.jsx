import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsRecommandationsPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Recommandations</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Recommandations boursières : idées, pas ordres automatiques
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Une rubrique « Recommandations » permet de regrouper des idées d&apos;achat, de renforcement
          ou de prise de bénéfices sur certaines valeurs. Les exemples ci-dessous sont fictifs et
          ne constituent pas des conseils personnalisés.
        </p>

        {/* Exemples de recommandations (fictives) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Exemples de recommandations fictives</h2>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Société</th>
                  <th className="px-4 py-2 text-left">Ticker</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Horizon</th>
                  <th className="px-4 py-2 text-left">Commentaire synthétique</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Sonatel</td>
                  <td className="px-4 py-2 text-gray-700">SONATEL</td>
                  <td className="px-4 py-2 text-green-700 font-semibold">Idée d&apos;achat</td>
                  <td className="px-4 py-2 text-gray-700">12–18 mois</td>
                  <td className="px-4 py-2 text-gray-700">Profil de rendement régulier, position dominante dans les télécoms UEMOA.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Total CI</td>
                  <td className="px-4 py-2 text-gray-700">TOTALCI</td>
                  <td className="px-4 py-2 text-yellow-700 font-semibold">Conserver</td>
                  <td className="px-4 py-2 text-gray-700">6–12 mois</td>
                  <td className="px-4 py-2 text-gray-700">Bon historique de dividendes, mais valorisation déjà relativement tendue.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">SOGB</td>
                  <td className="px-4 py-2 text-gray-700">SOGB</td>
                  <td className="px-4 py-2 text-red-700 font-semibold">Prise de bénéfices</td>
                  <td className="px-4 py-2 text-gray-700">Court terme</td>
                  <td className="px-4 py-2 text-gray-700">Le cours a fortement monté, prendre une partie des gains peut réduire le risque.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ces exemples sont purement pédagogiques. En réel, une recommandation doit préciser les
            hypothèses, les risques et le profil d&apos;investisseur visé.
          </p>
        </section>

        {/* Rappels de prudence */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Principes de prudence</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Ne jamais suivre une recommandation sans comprendre la société et les risques associés.</li>
            <li>Adapter les idées à ton horizon, ton profil de risque et ton portefeuille existant.</li>
            <li>Comparer plusieurs sources plutôt que de se fier à un seul avis.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default OutilsRecommandationsPage;
