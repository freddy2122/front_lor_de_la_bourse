import React from 'react';
import { NavLink } from 'react-router-dom';

const AnalysesAutresOutilsAnalysePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Autres outils d&apos;analyse</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Autres outils pour analyser les sociétés et le marché
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Au-delà des ratios classiques et des graphiques, il existe de nombreux outils pour mieux
          analyser les sociétés cotées et suivre le marché : screeners, alertes, listes de
          surveillance, etc. Cette page présente quelques idées d&apos;outils à retrouver ou à imaginer
          sur la plateforme.
        </p>

        {/* Listes d'outils */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Screeners et filtres</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>
              <span className="font-semibold">Filtre par rendement</span> : trouver les valeurs avec un rendement de
              dividende supérieur à un certain seuil.
            </li>
            <li>
              <span className="font-semibold">Filtre par secteur</span> : isoler les banques, l&apos;agro-industrie,
              l&apos;industrie, etc., pour comparer les sociétés entre elles.
            </li>
            <li>
              <span className="font-semibold">Filtre par taille</span> : distinguer grandes capitalisations et plus
              petites valeurs.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Listes de surveillance</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Créer une liste personnalisée de sociétés à suivre de près.</li>
            <li>Afficher rapidement le cours, la variation, le rendement et les dernières news.</li>
            <li>Permettre de passer d&apos;une vue liste à une vue graphique en un clic.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Alertes</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>
              <span className="font-semibold">Alertes de prix</span> : être notifié quand un cours dépasse un seuil
              (à la hausse ou à la baisse).
            </li>
            <li>
              <span className="font-semibold">Alertes de news</span> : être prévenu lorsqu&apos;une société publie une
              nouvelle ou un rapport important.
            </li>
            <li>
              <span className="font-semibold">Alertes de dividende</span> : suivre les annonces de dividende et les
              dates clés (détachement, mise en paiement).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">4. À garder en tête</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Les outils d&apos;analyse sont là pour t&apos;aider à décider, pas pour décider à ta place.</li>
            <li>Plus un outil est puissant, plus il doit être utilisé avec une bonne compréhension des risques.</li>
            <li>Commencer simple (quelques filtres de base, quelques alertes) avant d&apos;ajouter trop de complexité.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalysesAutresOutilsAnalysePage;
