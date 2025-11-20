import React from 'react';
import { NavLink } from 'react-router-dom';

const INDICES = [
  {
    code: 'BRVM10',
    name: 'BRVM 10',
    type: 'Indice principal',
    description:
      "Regroupe 10 valeurs représentatives du marché, sélectionnées pour leur liquidité et leur capitalisation.",
  },
  {
    code: 'BRVMCOMP',
    name: 'BRVM Composite',
    type: 'Indice global',
    description:
      "Mesure la performance de l'ensemble des actions cotées sur la BRVM. C'est l'indicateur global du marché.",
  },
  {
    code: 'BRVMAGRI',
    name: 'BRVM Agriculture',
    type: 'Indice sectoriel',
    description:
      "Suit les sociétés du secteur agro-industriel (hévéa, huile de palme, etc.). Sensible aux cours des matières premières.",
  },
  {
    code: 'BRVMBANQ',
    name: 'BRVM Banque',
    type: 'Indice sectoriel',
    description:
      "Regroupe les principales valeurs bancaires cotées, souvent au cœur du marché BRVM.",
  },
];

const AnalysesIndicesBoursiersPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Analyses</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Indices boursiers</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Comprendre les indices boursiers de la BRVM
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les indices boursiers permettent de suivre rapidement l&apos;évolution globale du marché ou
          d&apos;un secteur. Sur la BRVM, les indices comme le <span className="font-semibold">BRVM 10</span>
          ou le <span className="font-semibold">BRVM Composite</span> sont des références importantes
          pour situer la performance d&apos;un portefeuille.
        </p>

        {/* Tableau des indices */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Principaux indices BRVM</h2>
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg mb-3">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-left">Nom</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {INDICES.map((idx) => (
                  <tr key={idx.code}>
                    <td className="px-4 py-2 font-mono text-gray-800">{idx.code}</td>
                    <td className="px-4 py-2 text-gray-800">{idx.name}</td>
                    <td className="px-4 py-2 text-gray-700">{idx.type}</td>
                    <td className="px-4 py-2 text-gray-700">{idx.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            Les codes et descriptions ci-dessus sont fournis à titre pédagogique. Pour les valeurs
            en temps réel, il faudra se référer aux données de marché.
          </p>
        </section>

        {/* Utilisation des indices */}
        <section>
          <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Comment utiliser les indices dans ton analyse</h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>
              Comparer la performance de ton portefeuille à celle d&apos;un indice de référence (par
              exemple BRVM Composite).
            </li>
            <li>
              Suivre un indice sectoriel pour repérer les périodes plus favorables à un secteur
              (banques, agro, etc.).
            </li>
            <li>
              Utiliser les indices comme baromètre général avant d&apos;analyser une valeur en
              particulier.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AnalysesIndicesBoursiersPage;
