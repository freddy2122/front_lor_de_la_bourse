import React from 'react';
import { NavLink } from 'react-router-dom';

const OutilsJourneeDeCotationPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Outils</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Journée de cotation</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Journée de cotation à la BRVM (vue pédagogique)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Cette page décrit, de manière simplifiée, les grandes étapes d&apos;une séance de bourse sur
          la BRVM : de la pré-ouverture à la clôture, en passant par l&apos;exécution des ordres et la
          publication des cours.
        </p>

        {/* Étapes de la journée */}
        <section>
          <ol className="list-decimal list-inside text-sm text-gray-800 space-y-3">
            <li>
              <span className="font-semibold">Avant l&apos;ouverture</span> :
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                <li>Les investisseurs passent leurs ordres d&apos;achat/vente via leurs SGI.</li>
                <li>Les SGI contrôlent les soldes espèces / titres dans les systèmes internes.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Phase de pré-ouverture</span> :
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                <li>Les ordres s&apos;accumulent dans le carnet sans exécution immédiate.</li>
                <li>Un prix théorique d&apos;ouverture se dégage pour chaque valeur.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Ouverture de la séance</span> :
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                <li>Les premiers cours de la journée sont fixés en fonction des ordres présents.</li>
                <li>Les transactions commencent à être exécutées en continu (selon le mode de cotation).</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Pendant la séance</span> :
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                <li>De nouveaux ordres arrivent, certains sont exécutés immédiatement, d&apos;autres restent en attente.</li>
                <li>Les cours évoluent au fil des échanges, le palmarès et les volumes se mettent à jour.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Clôture</span> :
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                <li>Les derniers cours de la séance sont publiés.</li>
                <li>Les indices (BRVM 10, Composite, sectoriels) sont calculés pour la clôture.</li>
              </ul>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default OutilsJourneeDeCotationPage;
