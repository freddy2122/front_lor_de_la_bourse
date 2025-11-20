import React from 'react';
import { NavLink } from 'react-router-dom';

const SCALE = [
  { grade: 'AAA / AA', description: 'Qualité de crédit très élevée, risque de défaut considéré comme très faible.' },
  { grade: 'A', description: 'Qualité de crédit élevée, mais un peu plus sensible au contexte économique.' },
  { grade: 'BBB', description: 'Qualité de crédit moyenne, encore dans la catégorie « Investment grade ».' },
  { grade: 'BB / B', description: 'Spéculatif, plus exposé au risque de défaut (« High yield »).' },
  { grade: 'CCC et en dessous', description: 'Risque de défaut élevé ou situation déjà très dégradée.' },
];

const AnalysesNotationsFinancieresPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Notations financières</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Notations financières et qualité de crédit
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les notations financières (ou ratings) évaluent la capacité d&apos;un émetteur (État, banque,
          entreprise) à honorer ses engagements financiers. Elles sont émises par des agences
          spécialisées (ex : S&P, Moody&apos;s, Fitch, agences locales) et fournissent un repère sur le
          niveau de risque de crédit.
        </p>

        {/* Echelle simplifiée */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Échelle simplifiée des notations</h2>
          <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Fourchette de notation</th>
                  <th className="px-4 py-2 text-left">Interprétation générale</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {SCALE.map((row) => (
                  <tr key={row.grade}>
                    <td className="px-4 py-2 font-semibold text-brand-blue">{row.grade}</td>
                    <td className="px-4 py-2 text-gray-700">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Chaque agence a sa propre échelle détaillée (par exemple AAA, AA+, AA, AA-, etc.), mais
            l&apos;idée générale reste de distinguer la catégorie « Investment grade » de la catégorie
            spéculative.
          </p>
        </section>

        {/* Usage pour l'investisseur */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Comment utiliser ces notations</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2 mb-3">
            <li>Comparer le niveau de risque entre différents émetteurs d&apos;obligations.</li>
            <li>Identifier si un titre est plutôt « Investment grade » ou « High yield ».</li>
            <li>Suivre les changements de notation (amélioration ou dégradation) dans le temps.</li>
          </ul>
          <p className="text-xs text-gray-500">
            Une notation plus faible implique en général un rendement plus élevé, mais aussi un risque
            de défaut plus important.
          </p>
        </section>

        {/* Limites */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Limites des notations financières</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Les notations sont des opinions, pas des garanties.</li>
            <li>Les agences peuvent réagir avec retard à certains événements.</li>
            <li>Il est important de compléter par sa propre analyse (secteur, gouvernance, résultats...).</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalysesNotationsFinancieresPage;
