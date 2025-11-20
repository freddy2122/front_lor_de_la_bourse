import React from 'react';
import { NavLink } from 'react-router-dom';

const AnalysesPrevisionsBoursieresPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Prévisions boursières</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Prévisions boursières : ce qu&apos;il faut savoir
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les prévisions boursières (scénarios de cours, objectifs de prix, anticipations de dividende)
          peuvent aider à structurer une réflexion, mais elles ne sont jamais garanties. Cette page
          rappelle les principaux principes et limites à garder en tête.
        </p>

        {/* Section 1 : types de prévisions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Types de prévisions courants</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>
              <span className="font-semibold">Objectifs de cours</span> : estimation d&apos;un niveau de prix cible sur un
              horizon donné (ex : 12 mois).
            </li>
            <li>
              <span className="font-semibold">Scénarios de dividende</span> : projection d&apos;un dividende futur en fonction
              de la politique de distribution et des résultats attendus.
            </li>
            <li>
              <span className="font-semibold">Scénarios de marché</span> : hypothèses globales (marché haussier, neutre,
              baissier) pour une période donnée.
            </li>
          </ul>
        </section>

        {/* Section 2 : limites des prévisions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Limites importantes</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Les prévisions reposent sur des hypothèses (croissance, marges, contexte macroéconomique...).</li>
            <li>Un événement inattendu (crise, changement réglementaire, résultat décevant) peut invalider un scénario.</li>
            <li>Plus l&apos;horizon est long, plus l&apos;incertitude est grande.</li>
            <li>Deux analystes peuvent avoir des visions très différentes sur la même valeur.</li>
          </ul>
        </section>

        {/* Section 3 : bonnes pratiques */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Comment utiliser les prévisions de manière prudente</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Voir les prévisions comme des <span className="font-semibold">scénarios</span>, pas comme des certitudes.</li>
            <li>Comparer plusieurs sources et scénarios plutôt que de s&apos;appuyer sur un seul chiffre.</li>
            <li>Mettre en place sa propre marge de sécurité (par exemple, ne pas acheter uniquement parce qu&apos;un objectif de cours est plus élevé).</li>
            <li>Adapter ses décisions à son horizon, son profil de risque et sa stratégie globale (dividende, croissance, diversification...).</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalysesPrevisionsBoursieresPage;
