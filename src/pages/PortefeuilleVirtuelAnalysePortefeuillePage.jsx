import React from 'react';
import { NavLink } from 'react-router-dom';

const PortefeuilleVirtuelAnalysePortefeuillePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Portefeuille virtuel</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Analyse du portefeuille</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:4xl font-bold font-display text-brand-blue mb-3">
          Analyser ton portefeuille virtuel : répartition et performance
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Cette page présente des idées d&apos;indicateurs simples pour analyser ton portefeuille virtuel :
          répartition par valeur et par secteur, performance globale, risque de concentration, etc.
        </p>

        {/* Répartition par valeur */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Répartition par valeur</h2>
          <p className="text-sm text-gray-700 mb-3">
            L&apos;un des premiers réflexes consiste à regarder combien chaque ligne pèse dans le
            portefeuille total (en %). Idéalement, aucune valeur ne devrait représenter une part
            excessive par rapport à ton profil de risque.
          </p>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm mb-2">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Valeur</th>
                  <th className="px-4 py-2 text-left">Ticker</th>
                  <th className="px-4 py-2 text-right">Montant (FCFA)</th>
                  <th className="px-4 py-2 text-right">Poids</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Sonatel</td>
                  <td className="px-4 py-2 text-gray-700">SONATEL</td>
                  <td className="px-4 py-2 text-right text-gray-800">1 400 000</td>
                  <td className="px-4 py-2 text-right text-gray-800">28 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Total CI</td>
                  <td className="px-4 py-2 text-gray-700">TOTALCI</td>
                  <td className="px-4 py-2 text-right text-gray-800">900 000</td>
                  <td className="px-4 py-2 text-right text-gray-800">18 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">SOGB</td>
                  <td className="px-4 py-2 text-gray-700">SOGB</td>
                  <td className="px-4 py-2 text-right text-gray-800">700 000</td>
                  <td className="px-4 py-2 text-right text-gray-800">14 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">NSIA Banque CI</td>
                  <td className="px-4 py-2 text-gray-700">NSIA</td>
                  <td className="px-4 py-2 text-right text-gray-800">800 000</td>
                  <td className="px-4 py-2 text-right text-gray-800">16 %</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            Exemple fictif : si une seule ligne dépasse largement les 40–50 %, ton portefeuille est
            probablement trop concentré.
          </p>
        </section>

        {/* Performance globale */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Performance globale (fictive)</h2>
          <p className="text-sm text-gray-700 mb-3">
            Même en virtuel, suivre la performance globale permet de voir si ta stratégie tient la
            route sur plusieurs mois.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-brand-cream rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Valeur initiale</div>
              <div className="text-lg font-semibold text-brand-blue">5 000 000 FCFA</div>
            </div>
            <div className="bg-brand-cream rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Valeur actuelle</div>
              <div className="text-lg font-semibold text-brand-blue">5 350 000 FCFA</div>
            </div>
            <div className="bg-brand-cream rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Performance globale</div>
              <div className="text-lg font-semibold text-green-600">+7,0 %</div>
            </div>
          </div>
        </section>

        {/* Répartition par secteur */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Répartition par secteur (exemple)</h2>
          <p className="text-sm text-gray-700 mb-3">
            Une vue par secteur permet de savoir si tu es très exposé à un seul secteur (par exemple
            uniquement les banques) ou si ton portefeuille est plus équilibré.
          </p>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm mb-2">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Secteur</th>
                  <th className="px-4 py-2 text-right">Poids</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Banques</td>
                  <td className="px-4 py-2 text-right text-gray-800">32 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Télécoms</td>
                  <td className="px-4 py-2 text-right text-gray-800">28 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Énergie</td>
                  <td className="px-4 py-2 text-right text-gray-800">20 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Agro-industrie</td>
                  <td className="px-4 py-2 text-right text-gray-800">20 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortefeuilleVirtuelAnalysePortefeuillePage;
