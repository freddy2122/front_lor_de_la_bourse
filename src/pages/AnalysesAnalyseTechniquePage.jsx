import React from 'react';
import { NavLink } from 'react-router-dom';

const AnalysesAnalyseTechniquePage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Analyse technique</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Introduction à l&apos;analyse technique
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          L&apos;analyse technique utilise les historiques de prix et de volumes pour identifier des
          tendances et des signaux potentiels. Sur la BRVM, elle est souvent utilisée en complément
          de l&apos;analyse fondamentale pour affiner le timing d&apos;entrée ou de sortie.
        </p>

        {/* Section moyennes mobiles */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Moyennes mobiles (MM)</h2>
          <p className="text-sm text-gray-700 mb-3">
            Une moyenne mobile lisse l&apos;évolution des cours sur une période donnée (par exemple 20 ou
            50 séances). Elle permet de visualiser la tendance de fond :
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-3">
            <li>MM courte (ex : 20 jours) : réagit vite aux changements de prix.</li>
            <li>MM longue (ex : 50 ou 100 jours) : met en évidence la tendance de moyen terme.</li>
            <li>Croisement MM20 / MM50 : un signal suivi par certains traders (haussier ou baissier).</li>
          </ul>
          <p className="text-xs text-gray-500">
            Exemple : si la moyenne mobile 20 jours passe au-dessus de la moyenne 50 jours sur une
            valeur, on parle parfois de signal haussier (« golden cross »).
          </p>
        </section>

        {/* Section RSI */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. RSI (Relative Strength Index)</h2>
          <p className="text-sm text-gray-700 mb-3">
            Le RSI est un oscillateur entre 0 et 100 qui mesure la vitesse et l&apos;ampleur des
            mouvements de prix. Il est souvent interprété ainsi :
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-3">
            <li>RSI &gt; 70 : zone souvent qualifiée de « surachat ».</li>
            <li>RSI &lt; 30 : zone souvent qualifiée de « survente ».</li>
            <li>Les divergences entre RSI et cours peuvent alerter sur un essoufflement de tendance.</li>
          </ul>
          <p className="text-xs text-gray-500">
            Attention : un RSI élevé n&apos;implique pas forcément une baisse immédiate, ni l&apos;inverse.
            Il s&apos;agit d&apos;un indicateur parmi d&apos;autres.
          </p>
        </section>

        {/* Section MACD */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. MACD (Moving Average Convergence Divergence)</h2>
          <p className="text-sm text-gray-700 mb-3">
            La MACD est construite à partir de deux moyennes mobiles exponentielles et d&apos;une ligne de
            signal. Elle met en évidence le momentum (élan) du mouvement :
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-3">
            <li>
              Croisement de la MACD au-dessus de la ligne de signal : interprété comme un signal
              haussier par certains opérateurs.
            </li>
            <li>
              Croisement en dessous de la ligne de signal : interprété comme un signal baissier
              potentiel.
            </li>
            <li>
              L&apos;écart entre MACD et signal renseigne sur la force du mouvement.
            </li>
          </ul>
        </section>

        {/* Section prudence */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">4. Quelques principes de prudence</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
            <li>Ne jamais utiliser un indicateur isolé pour prendre une décision importante.</li>
            <li>Combiner analyse technique et <span className="font-semibold">analyse fondamentale</span> (résultats, secteur, news).</li>
            <li>Tester toute méthode sur des données historiques avant de l&apos;appliquer en réel.</li>
            <li>Adapter les paramètres (périodes, seuils) à l&apos;horizon de placement et à la liquidité des valeurs BRVM.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalysesAnalyseTechniquePage;
