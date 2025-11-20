import React from 'react';
import { NavLink } from 'react-router-dom';

const PortefeuilleVirtuelAutresDonneesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Portefeuille virtuel</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Autres données du portefeuille</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Autres données utiles pour suivre ton portefeuille virtuel
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          En plus de la répartition et de la performance, plusieurs autres informations sont utiles
          pour comprendre l&apos;évolution de ton portefeuille virtuel : historique des opérations,
          flux de dividendes simulés, journal des décisions, etc.
        </p>

        {/* Historique des opérations */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Historique des opérations</h2>
          <p className="text-sm text-gray-700 mb-3">
            Un historique clair des achats, ventes et encaissements permet de revenir facilement sur
            les étapes de construction du portefeuille.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Date, type d&apos;ordre (achat/vente), valeur, quantité, prix.</li>
            <li>Éventuelles commissions virtuelles appliquées.</li>
            <li>Solde espèces avant/après l&apos;opération.</li>
          </ul>
        </section>

        {/* Flux de dividendes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Flux de dividendes (simulés)</h2>
          <p className="text-sm text-gray-700 mb-3">
            Voir, même en simulation, quels dividendes auraient été perçus permet de mieux comprendre
            la contribution du « revenu » à la performance totale.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Montant par société et par date de paiement.</li>
            <li>Total cumulé depuis le début de la simulation.</li>
            <li>Part de la performance totale provenant des dividendes vs. des plus-values.</li>
          </ul>
        </section>

        {/* Journal des décisions */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Journal des décisions</h2>
          <p className="text-sm text-gray-700 mb-3">
            Noter brièvement pourquoi tu as acheté ou vendu une valeur aide à progresser. Tu peux
            ensuite comparer tes intentions initiales avec ce qui s&apos;est passé.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Résumé de la thèse (rendement, croissance, diversification...).</li>
            <li>Horizon de placement envisagé.</li>
            <li>Conditions éventuelles de sortie (prise de bénéfices, limite de perte).</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PortefeuilleVirtuelAutresDonneesPage;
