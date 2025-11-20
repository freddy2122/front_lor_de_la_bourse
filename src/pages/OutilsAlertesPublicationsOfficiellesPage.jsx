import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsAlertesPublicationsOfficiellesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Alertes publications officielles</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Alertes sur publications officielles BRVM
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les publications officielles (rapports, avis, dividendes, homologations) ont souvent un
          impact important sur les cours. Un système d&apos;alertes peut t&apos;aider à ne pas rater ces
          informations clés.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Types de publications à suivre</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2 mb-4">
            <li>Rapports d&apos;activité annuels et semestriels.</li>
            <li>Annonce de dividendes (montant, calendrier).</li>
            <li>Avis au marché (opérations sur titres, suspensions, homologations de tarifs...).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Exemple d&apos;alertes (fictif)</h2>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Société</th>
                  <th className="px-4 py-2 text-left">Type de publication</th>
                  <th className="px-4 py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-gray-800">Sonatel</td>
                  <td className="px-4 py-2 text-gray-700">Nouveau rapport annuel</td>
                  <td className="px-4 py-2 text-gray-700">Notifier dès qu&apos;un rapport est publié sur BRVM ou Sonatel.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-800">Total CI</td>
                  <td className="px-4 py-2 text-gray-700">Annonce de dividende</td>
                  <td className="px-4 py-2 text-gray-700">Notifier pour toute nouvelle annonce de dividende.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Dans un environnement connecté, ces alertes pourraient être déclenchées dès que la
            publication apparaît dans les flux BRVM ou les scrapers associés.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OutilsAlertesPublicationsOfficiellesPage;
