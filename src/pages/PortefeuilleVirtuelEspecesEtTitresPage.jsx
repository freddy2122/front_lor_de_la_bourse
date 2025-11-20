import React from 'react';
import { NavLink } from 'react-router-dom';

const PortefeuilleVirtuelEspecesEtTitresPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Portefeuille virtuel</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Espèces et titres</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Espèces et titres : comprendre la structure de ton portefeuille
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Dans un portefeuille boursier (réel ou virtuel), on distingue toujours deux volets :
          l&apos;<span className="font-semibold">espèce</span> (cash disponible) et les <span className="font-semibold">titres</span>
          (actions, obligations, etc.). Bien suivre ces deux composantes est essentiel pour piloter
          tes investissements.
        </p>

        {/* Section 1 : Espèces */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Espèces (cash)</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Montant disponible pour passer de nouveaux ordres d&apos;achat.</li>
            <li>Peut provenir d&apos;un versement initial, de ventes de titres ou d&apos;encaissement de dividendes.</li>
            <li>Ne subit pas la volatilité des marchés mais ne génère pas de rendement boursier.</li>
          </ul>
        </section>

        {/* Section 2 : Titres */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Titres (actions)</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Représentent les positions que tu détiens sur les sociétés cotées (SONATEL, TOTALCI, etc.).</li>
            <li>Leur valeur varie en fonction des cours de bourse.</li>
            <li>Peuvent générer des dividendes simulés dans le cadre du portefeuille virtuel.</li>
          </ul>
        </section>

        {/* Section 3 : exemple de répartition */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Exemple de répartition (portefeuille fictif)</h2>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto mb-3 text-sm">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Composante</th>
                  <th className="px-4 py-2 text-right">Montant (FCFA)</th>
                  <th className="px-4 py-2 text-right">Poids</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Espèces</td>
                  <td className="px-4 py-2 text-right text-gray-800">1 500 000</td>
                  <td className="px-4 py-2 text-right text-gray-800">30 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Titres (ensemble des actions)</td>
                  <td className="px-4 py-2 text-right text-gray-800">3 500 000</td>
                  <td className="px-4 py-2 text-right text-gray-800">70 %</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            Ces chiffres sont purement illustratifs. L&apos;idée est de visualiser rapidement la part
            investie et la part encore disponible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PortefeuilleVirtuelEspecesEtTitresPage;
