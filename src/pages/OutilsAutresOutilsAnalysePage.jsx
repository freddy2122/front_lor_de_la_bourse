import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsAutresOutilsAnalysePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Autres outils d&apos;analyse</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Autres outils d&apos;analyse et de suivi
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          En complément des outils déjà présentés (palmarès, comparaisons, filtrages), d&apos;autres
          fonctionnalités peuvent faciliter le suivi de tes investissements et de la BRVM.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Watchlists avancées</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Créer plusieurs listes de valeurs (ex : &quot;Dividendes&quot;, &quot;Croissance&quot;, &quot;À surveiller&quot;).</li>
            <li>Afficher pour chaque liste les principales données (cours, variation, news récentes).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Backtests simples</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Simuler la performance d&apos;une stratégie sur quelques années (par exemple, acheter les 5 plus gros rendements chaque année).</li>
            <li>Comparer le résultat à celui d&apos;un indice de référence (BRVM Composite).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Notes et journaux intégrés</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Associer des notes à chaque société ou à chaque opération pour garder une trace de ta réflexion.</li>
            <li>Revenir plus tard sur ces notes pour analyser ce qui a bien ou moins bien fonctionné.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default OutilsAutresOutilsAnalysePage;
