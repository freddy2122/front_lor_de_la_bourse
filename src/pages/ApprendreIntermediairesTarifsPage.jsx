import React from 'react';
import { NavLink } from 'react-router-dom';

const FEES = [
  {
    type: "Frais de courtage",
    description:
      "Commission perçue par la SGI pour l'exécution de chaque ordre d'achat ou de vente.",
    example: "0,50 % du montant de l'ordre (avec un minimum en FCFA)",
  },
  {
    type: "Frais de tenue de compte",
    description:
      "Frais liés à la conservation des titres et à la gestion administrative du compte-titres.",
    example: "Forfait annuel ou pourcentage de la valeur du portefeuille",
  },
  {
    type: "Frais sur dividendes",
    description:
      "Eventuelle commission de traitement sur l'encaissement des dividendes.",
    example: "Petit pourcentage prélevé sur le dividende brut, selon la SGI",
  },
  {
    type: "Frais d'ouverture / clôture",
    description:
      "Certains intermédiaires peuvent facturer des frais ponctuels à l'ouverture ou à la clôture du compte.",
    example: "Généralement faibles ou gratuits, selon la SGI",
  },
];

const ApprendreIntermediairesTarifsPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Apprendre</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Intermédiaires & tarifs</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Intermédiaires & tarifs à la BRVM
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Pour investir en bourse, tu passes toujours par un intermédiaire : la <span className="font-semibold">SGI</span>.
          Comprendre son rôle et la structure des frais t&apos;aide à éviter les mauvaises surprises et à comparer
          les offres de manière éclairée.
        </p>

        {/* Rôle de la SGI */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Rôle de la SGI (intermédiaire boursier)</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Ouvrir et tenir ton <span className="font-semibold">compte-titres</span> et ton compte espèces.</li>
            <li>Recevoir tes ordres d&apos;achat/vente et les transmettre à la BRVM pour exécution.</li>
            <li>Encaisser pour ton compte les dividendes, opérations sur titres (splits, augmentations de capital...).</li>
            <li>Fournir des relevés de portefeuille et, selon les services, un accompagnement personnalisé.</li>
          </ul>
        </section>

        {/* Tableau des frais types */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Les principaux types de frais</h2>
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Type de frais</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Exemple indicatif</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {FEES.map((row) => (
                  <tr key={row.type}>
                    <td className="px-4 py-2 font-semibold text-brand-blue">{row.type}</td>
                    <td className="px-4 py-2 text-gray-700">{row.description}</td>
                    <td className="px-4 py-2 text-gray-700">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Les montants ci-dessus sont purement indicatifs. Chaque SGI publie sa propre grille tarifaire
            officielle, que tu dois consulter avant de t&apos;engager.
          </p>
        </section>

        {/* Conseils pratiques */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Conseils pour comparer les intermédiaires</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>Comparer le <span className="font-semibold">frais de courtage</span> pour un ordre de taille moyenne (par exemple 500 000 FCFA).</li>
            <li>Vérifier l&apos;existence de <span className="font-semibold">minimums de facturation</span> par ordre.</li>
            <li>Regarder si les frais de tenue de compte sont <span className="font-semibold">forfaitaires ou proportionnels</span> à la taille du portefeuille.</li>
            <li>Prendre en compte la <span className="font-semibold">qualité du service</span> (plateforme en ligne, disponibilité des conseillers, relevés clairs).</li>
            <li>Ne pas hésiter à poser des questions avant d&apos;ouvrir ton compte : tous les frais doivent être transparents.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ApprendreIntermediairesTarifsPage;
