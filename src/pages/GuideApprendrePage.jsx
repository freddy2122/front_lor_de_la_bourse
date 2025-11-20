import React from 'react';
import { NavLink } from 'react-router-dom';

const GuideApprendrePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Apprendre</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Guide</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-4">
          Guide pour débuter en bourse à la BRVM
        </h1>
        <p className="text-gray-700 mb-8 max-w-3xl">
          Ce guide a pour objectif de t&apos;expliquer, étape par étape, comment fonctionne la bourse
          régionale (BRVM), comment lire les principales informations de marché et comment structurer
          une première démarche d&apos;investissement de manière simple.
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Comprendre les acteurs clés</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-brand-cream rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Investisseur</h3>
              <p className="text-sm text-gray-700">
                Particulier ou institution qui souhaite placer son argent en actions ou obligations
                pour faire fructifier son capital dans le temps.
              </p>
            </div>
            <div className="bg-brand-cream rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">SGI (intermédiaire)</h3>
              <p className="text-sm text-gray-700">
                Société de gestion et d&apos;intermédiation qui exécute tes ordres d&apos;achat/vente sur la BRVM
                et t&apos;accompagne dans ton suivi de portefeuille.
              </p>
            </div>
            <div className="bg-brand-cream rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">BRVM</h3>
              <p className="text-sm text-gray-700">
                La Bourse Régionale des Valeurs Mobilières, marché commun aux pays de l&apos;UEMOA,
                où sont cotées les sociétés et où se fixent les prix.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Les grandes étapes pour investir</h2>
          <ol className="space-y-3 list-decimal list-inside text-sm text-gray-800">
            <li>
              <span className="font-semibold">Ouvrir un compte-titres</span> auprès d&apos;une SGI agréée
              (dossier KYC, pièces d&apos;identité, formulaires, etc.).
            </li>
            <li>
              <span className="font-semibold">Alimenter ton compte espèces</span> par virement ou dépôt afin
              de disposer d&apos;un montant disponible pour passer des ordres.
            </li>
            <li>
              <span className="font-semibold">Choisir les sociétés</span> à partir des informations de marché
              (cours, palmarès, news, publications officielles) et de ton horizon de placement.
            </li>
            <li>
              <span className="font-semibold">Passer un ordre d&apos;achat</span> (quantité, limite de prix,
              durée de validité) via ta SGI ou la plateforme en ligne.
            </li>
            <li>
              <span className="font-semibold">Suivre ton portefeuille</span> régulièrement : cours, dividendes,
              news, rapports d&apos;activité, etc.
            </li>
          </ol>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Comment lire une fiche valeur</h2>
          <p className="text-sm text-gray-700 mb-4">
            Sur les pages <span className="font-semibold">Actions</span>, <span className="font-semibold">Indices</span>
            ou <span className="font-semibold">Palmarès</span>, plusieurs indicateurs reviennent souvent.
            Voici un petit récapitulatif :
          </p>
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Indicateur</th>
                  <th className="px-4 py-2 text-left">Signification</th>
                  <th className="px-4 py-2 text-left">Exemple</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-semibold">Dernier cours</td>
                  <td className="px-4 py-2">Prix de la dernière transaction effectuée sur la valeur.</td>
                  <td className="px-4 py-2">SONATEL à 17 500 FCFA</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Variation (%)</td>
                  <td className="px-4 py-2">Hausse ou baisse par rapport à la séance précédente.</td>
                  <td className="px-4 py-2">+1,45 % ou -0,80 %</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Volume</td>
                  <td className="px-4 py-2">Nombre de titres échangés pendant la séance.</td>
                  <td className="px-4 py-2">120 500 titres échangés</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Capitalisation</td>
                  <td className="px-4 py-2">Valeur boursière totale de la société (cours x nombre d&apos;actions).</td>
                  <td className="px-4 py-2">Calcul indicatif, visible dans la fiche détaillée.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">4. Bonnes pratiques pour débuter sereinement</h2>
          <ul className="space-y-2 text-sm text-gray-800 list-disc list-inside">
            <li>Commencer avec un montant que tu es prêt(e) à immobiliser plusieurs années.</li>
            <li>Éviter de concentrer tout ton portefeuille sur une seule valeur.</li>
            <li>Lire les <span className="font-semibold">publications officielles</span> et les <span className="font-semibold">actualités</span> avant de prendre une décision.</li>
            <li>Suivre régulièrement ton portefeuille sans regarder les cours toutes les minutes.</li>
            <li>Te fixer un horizon et une stratégie (rendement dividende, croissance, diversification…).</li>
          </ul>
        </section>

        {/* CTA simple */}
        <section className="bg-brand-cream rounded-lg p-4 md:p-6">
          <h2 className="text-xl font-semibold text-brand-blue mb-2">Aller plus loin avec les outils de la plateforme</h2>
          <p className="text-sm text-gray-700 mb-3">
            Une fois les bases comprises, tu peux explorer les autres pages du menu pour approfondir :
            palmarès, analyses, données historiques, filtres par société, etc.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <NavLink to="/marches/actions" className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-brand-gold text-brand-blue hover:bg-gray-50">
              Voir les actions cotées
            </NavLink>
            <NavLink to="/marches/palmares-hebdomadaires" className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold text-brand-blue font-semibold hover:bg-opacity-90">
              Consulter le palmarès du jour
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuideApprendrePage;
