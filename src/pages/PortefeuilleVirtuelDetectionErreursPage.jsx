import React from 'react';
import { NavLink } from 'react-router-dom';

const PortefeuilleVirtuelDetectionErreursPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Portefeuille virtuel</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Détection des erreurs</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Détection des erreurs dans le portefeuille virtuel
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Le portefeuille virtuel est un bon endroit pour repérer les erreurs de saisie ou
          d&apos;allocation avant de les reproduire en réel. Voici quelques types d&apos;erreurs fréquentes
          et des idées d&apos;indicateurs simples pour les identifier.
        </p>

        {/* Section 1 : erreurs de saisie */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Erreurs de saisie</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Quantité 10x trop élevée (ex : 1 000 titres au lieu de 100).</li>
            <li>Prix saisi avec un zéro de trop (ex : 150 000 FCFA au lieu de 15 000 FCFA).</li>
            <li>Ordre passé sur la mauvaise valeur (confusion entre deux tickers proches).</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            Dans un portefeuille virtuel, ces erreurs peuvent être repérées en vérifiant la taille de
            chaque ligne par rapport au montant total et au cash disponible.
          </p>
        </section>

        {/* Section 2 : erreurs d'allocation */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Erreurs d&apos;allocation</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Portefeuille trop concentré sur une seule valeur (&gt; 40 % du total).</li>
            <li>Exposition quasi nulle à certains secteurs importants (banques, télécoms, agro...).</li>
            <li>Aucune partie du portefeuille laissée en espèces pour saisir des opportunités.</li>
          </ul>
        </section>

        {/* Section 3 : exemples d'indicateurs de contrôle */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Idées d&apos;indicateurs de contrôle (à ajouter plus tard)</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Alerte quand une ligne dépasse un certain pourcentage du portefeuille (ex : 30 %).</li>
            <li>Alerte quand la somme des quantités achetées ne correspond pas au cash consommé attendu.</li>
            <li>Affichage de la répartition par secteur pour repérer les trous ou les excès.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PortefeuilleVirtuelDetectionErreursPage;
