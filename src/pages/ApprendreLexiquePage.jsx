import React from 'react';
import { NavLink } from 'react-router-dom';

const TERMS = [
  {
    term: 'BRVM',
    definition:
      "Bourse Régionale des Valeurs Mobilières, marché unique commun aux pays de l'UEMOA où sont cotées les actions et obligations.",
  },
  {
    term: 'SGI',
    definition:
      "Société de Gestion et d’Intermédiation. Intermédiaire agréé qui exécute les ordres d’achat/vente et tient le compte-titres de l’investisseur.",
  },
  {
    term: 'Compte-titres',
    definition:
      "Compte ouvert auprès d’une SGI qui enregistre la détention des valeurs mobilières (actions, obligations) de l’investisseur.",
  },
  {
    term: 'Dividende',
    definition:
      "Part du bénéfice distribuée aux actionnaires. Il peut être annuel, intermédiaire ou exceptionnel, exprimé en FCFA par action.",
  },
  {
    term: 'Rendement du dividende',
    definition:
      "Dividende par action divisé par le cours de l’action, exprimé en %. Indique le revenu annuel potentiel lié au dividende.",
  },
  {
    term: 'Capitalisation boursière',
    definition:
      "Valeur totale en bourse d’une société cotée (cours x nombre d’actions). Donne une idée de la taille de l’entreprise sur le marché.",
  },
  {
    term: 'PER (Price Earning Ratio)',
    definition:
      "Rapport entre le cours et le bénéfice par action. Indicateur du niveau de valorisation (combien de fois le marché paie le bénéfice).",
  },
  {
    term: 'Liquidité',
    definition:
      "Facilité avec laquelle un titre peut être acheté ou vendu sans trop impacter son prix (volumes et fréquence de cotation).",
  },
  {
    term: 'Ordre à cours limité',
    definition:
      "Ordre d’achat/vente avec un prix maximum (achat) ou minimum (vente) fixé par l’investisseur.",
  },
  {
    term: 'Volatilité',
    definition:
      "Amplitude des variations de cours d’un titre sur une période donnée. Plus elle est élevée, plus le prix bouge fortement.",
  },
];

const ApprendreLexiquePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Apprendre</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Lexique</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Lexique des principaux termes boursiers
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Ce mini lexique rassemble les notions les plus utilisées dans les pages Marchés, Analyses
          et Apprendre. L’objectif est de te permettre de relier rapidement les termes à des exemples
          concrets sur la BRVM.
        </p>

        {/* Liste des termes */}
        <div className="bg-white border border-gray-100 rounded-lg divide-y">
          {TERMS.map((item) => (
            <div key={item.term} className="px-4 md:px-6 py-4">
              <h2 className="text-base md:text-lg font-semibold text-brand-blue mb-1">
                {item.term}
              </h2>
              <p className="text-sm md:text-base text-gray-700">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprendreLexiquePage;
