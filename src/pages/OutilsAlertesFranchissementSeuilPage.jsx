import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsAlertesFranchissementSeuilPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Alertes franchissement de seuil</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Alertes de prix : être prévenu en cas de franchissement de seuil
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les alertes de prix permettent d&apos;être notifié lorsque le cours d&apos;une action dépasse ou
          descend en dessous d&apos;un niveau que tu as défini. Cela évite de surveiller les cours en
          permanence.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Types d&apos;alertes courants</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Alerte quand le cours franchit à la hausse un seuil (ex : 20 000 FCFA).</li>
            <li>Alerte quand le cours franchit à la baisse un seuil (ex : 15 000 FCFA).</li>
            <li>Alerte sur variation journalière trop forte (ex : +5 % ou -5 %).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Exemple de paramétrage (fictif)</h2>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Société</th>
                  <th className="px-4 py-2 text-left">Ticker</th>
                  <th className="px-4 py-2 text-left">Condition</th>
                  <th className="px-4 py-2 text-left">Seuil</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Sonatel</td>
                  <td className="px-4 py-2 text-gray-700">SONATEL</td>
                  <td className="px-4 py-2 text-gray-700">Cours &gt;=</td>
                  <td className="px-4 py-2 text-gray-800">20 000 FCFA</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Total CI</td>
                  <td className="px-4 py-2 text-gray-700">TOTALCI</td>
                  <td className="px-4 py-2 text-gray-700">Cours &lt;=</td>
                  <td className="px-4 py-2 text-gray-800">1 800 FCFA</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Dans une version connectée, ces alertes seraient envoyées par e-mail, SMS ou notification
            dans l&apos;application lorsque les conditions sont remplies.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OutilsAlertesFranchissementSeuilPage;
