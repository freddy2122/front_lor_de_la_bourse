import React from 'react';
import { NavLink } from 'react-router-dom';

const AnalyseGraphiquePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Analyse graphique</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Bases de l&apos;analyse graphique à la BRVM
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          L&apos;analyse graphique (ou analyse chartiste) consiste à étudier l&apos;évolution des cours
          sur un graphique pour identifier des tendances, des zones de prix importantes et des
          signaux potentiels d&apos;achat ou de vente. Cette page présente les notions clés sans
          entrer dans des recommandations personnalisées.
        </p>

        {/* Section tendances */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Tendances : haussière, baissière, neutre</h2>
          <p className="text-sm text-gray-700 mb-3">
            Une tendance traduit la direction générale des cours sur une période donnée :
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-3">
            <li>
              <span className="font-semibold">Tendance haussière</span> : succession de sommets et de creux de plus en plus hauts.
            </li>
            <li>
              <span className="font-semibold">Tendance baissière</span> : sommets et creux de plus en plus bas.
            </li>
            <li>
              <span className="font-semibold">Tendance neutre</span> : le cours oscille dans un couloir horizontal.
            </li>
          </ul>
          <p className="text-xs text-gray-500">
            Exemple : si SONATEL passe de 14 000 à 18 000 FCFA en plusieurs mois avec des corrections
            intermédiaires, on parle de tendance haussière de moyen terme.
          </p>
        </section>

        {/* Section supports / résistances */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Supports et résistances</h2>
          <p className="text-sm text-gray-700 mb-3">
            Les <span className="font-semibold">supports</span> et <span className="font-semibold">résistances</span>
            sont des zones de prix où le marché a historiquement eu tendance à rebondir ou à bloquer.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div className="bg-brand-cream rounded-lg p-4 text-sm text-gray-800">
              <h3 className="font-semibold text-brand-blue mb-1">Support</h3>
              <p>
                Niveau de prix en dessous duquel le cours a du mal à passer. La demande devient
                plus forte que l&apos;offre et le titre rebondit souvent à proximité.
              </p>
            </div>
            <div className="bg-brand-cream rounded-lg p-4 text-sm text-gray-800">
              <h3 className="font-semibold text-brand-blue mb-1">Résistance</h3>
              <p>
                Niveau de prix au-dessus duquel le cours a du mal à se maintenir. L&apos;offre devient
                plus forte que la demande et le titre a tendance à reculer.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Exemple simplifié : si une valeur rebondit plusieurs fois autour de 1 000 FCFA, ce niveau
            peut être considéré comme un support ; si elle échoue souvent à dépasser 1 300 FCFA, on
            parle de résistance.
          </p>
        </section>

        {/* Section mini "graphique" textuel */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Lecture simplifiée d&apos;un mouvement de prix</h2>
          <p className="text-sm text-gray-700 mb-4">
            Sans entrer dans les chandeliers japonais ou les indicateurs avancés, on peut déjà
            observer la structure des mouvements de prix :
          </p>
          <div className="bg-white border border-gray-100 rounded-lg p-4 text-xs font-mono text-gray-800 mb-3">
            <div>Prix (exemple fictif pour une action BRVM)</div>
            <div className="mt-2">
              900 ┤        ╭───╮
            </div>
            <div>
              850 ┤     ╭──╯   ╰──╮
            </div>
            <div>
              800 ┤  ╭──╯        ╰──╮
            </div>
            <div>
              750 ┤─╯              ╰─
            </div>
            <div className="mt-1 text-gray-500">
              ← Temps
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Ici, on voit des creux de plus en plus hauts (750 → 780 → 800 FCFA) et des sommets de
            plus en plus hauts : c&apos;est typique d&apos;une tendance haussière.
          </p>
        </section>

        {/* Section prudence */}
        <section className="mb-2">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">4. À garder en tête</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
            <li>L&apos;analyse graphique ne garantit pas l&apos;avenir, elle aide à lire le passé et le présent.</li>
            <li>Elle est souvent combinée à <span className="font-semibold">l&apos;analyse fondamentale</span> (résultats, dividendes, secteur...).</li>
            <li>Il est préférable de tester toute approche sur le papier avant de l&apos;utiliser avec de gros montants.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalyseGraphiquePage;
