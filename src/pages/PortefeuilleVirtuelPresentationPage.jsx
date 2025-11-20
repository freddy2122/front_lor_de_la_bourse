import React from 'react';
import { NavLink } from 'react-router-dom';

const PortefeuilleVirtuelPresentationPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Portefeuille virtuel</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Présentation</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Portefeuille virtuel : s&apos;entraîner avant d&apos;investir en réel
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Le portefeuille virtuel te permet de simuler des achats/ventes d&apos;actions BRVM avec de
          l&apos;argent fictif. C&apos;est un espace sécurisé pour te familiariser avec la bourse, tester des
          stratégies et comprendre l&apos;impact de tes décisions sans risquer ton capital.
        </p>

        {/* Section 1 : objectifs */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Objectifs du portefeuille virtuel</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Découvrir le fonctionnement des ordres (achat, vente, quantités, prix limite...).</li>
            <li>Suivre l&apos;évolution d&apos;un portefeuille dans le temps (plus-values, moins-values, dividendes simulés).</li>
            <li>Tester différentes approches (valeurs de rendement, valeurs de croissance, diversification...).</li>
          </ul>
        </section>

        {/* Section 2 : principe de fonctionnement */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Principe de fonctionnement (version démo)</h2>
          <ol className="list-decimal list-inside text-sm text-gray-800 space-y-2">
            <li>Un montant fictif (par exemple 5 000 000 FCFA) est mis à disposition.</li>
            <li>Tu choisis des actions BRVM dans la liste et passes des ordres virtuels.</li>
            <li>Le portefeuille virtuel calcule la valeur de ton portefeuille en fonction des cours simulés.</li>
            <li>Tu peux analyser la répartition par valeur, par secteur, le cash disponible, etc.</li>
          </ol>
          <p className="text-xs text-gray-500 mt-2">
            Sur cette version du site, le portefeuille virtuel est présenté de manière pédagogique. La
            connexion aux données de marché en temps réel pourra être ajoutée plus tard.
          </p>
        </section>

        {/* Section 3 : bonnes pratiques d'utilisation */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Comment en tirer le meilleur</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Simuler un plan d&apos;investissement sur plusieurs mois plutôt qu&apos;une seule opération isolée.</li>
            <li>Noter les raisons de chaque achat/vente pour pouvoir les relire plus tard.</li>
            <li>Comparer la performance de ton portefeuille virtuel à un indice de référence (ex : BRVM Composite).</li>
            <li>Ne pas oublier que les émotions seront différentes quand de l&apos;argent réel sera en jeu.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PortefeuilleVirtuelPresentationPage;
