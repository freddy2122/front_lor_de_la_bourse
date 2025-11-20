import React from 'react';
import { NavLink } from 'react-router-dom';

const CATEGORIES = [
  'Découvrir la bourse',
  'Stratégies d’investissement',
  'Analyse des sociétés',
  'Gestion du risque',
];

const ARTICLES = [
  {
    id: 'debuter-brvm-10-questions',
    title: 'Débuter à la BRVM : 10 questions essentielles à se poser',
    category: 'Découvrir la bourse',
    level: 'Débutant',
    readTime: '7 min',
    excerpt:
      "Les bases à connaître avant d’ouvrir un compte-titres, choisir une SGI et passer ton premier ordre sur la BRVM.",
  },
  {
    id: 'comprendre-dividendes',
    title: 'Comprendre les dividendes : rendement, détachement et fiscalité',
    category: 'Stratégies d’investissement',
    level: 'Intermédiaire',
    readTime: '8 min',
    excerpt:
      "Comment fonctionnent les dividendes, comment lire un historique et ce qu’ils signifient pour un investisseur long terme.",
  },
  {
    id: 'lire-rapport-activite',
    title: "Comment lire un rapport d’activité d’une société cotée ?",
    category: 'Analyse des sociétés',
    level: 'Intermédiaire',
    readTime: '9 min',
    excerpt:
      "Chiffre d’affaires, résultat net, marge, perspectives : les rubriques clés à repérer dans un rapport annuel ou semestriel.",
  },
  {
    id: 'diversification-portefeuille',
    title: 'Diversifier son portefeuille à la BRVM : secteurs et pays',
    category: 'Gestion du risque',
    level: 'Débutant',
    readTime: '6 min',
    excerpt:
      "Pourquoi il est risqué de concentrer tous ses investissements sur une seule valeur ou un seul secteur.",
  },
  {
    id: 'erreurs-debutants',
    title: '5 erreurs fréquentes des débutants en bourse (et comment les éviter)',
    category: 'Gestion du risque',
    level: 'Débutant',
    readTime: '5 min',
    excerpt:
      "Poursuite des hausses, absence de plan, réactions émotionnelles : un tour d’horizon des pièges classiques.",
  },
];

const ApprendreArticlesPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Apprendre</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Articles</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Articles pédagogiques pour progresser en bourse
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Retrouve ici une sélection d’articles organisés par thématique pour comprendre la BRVM,
          les mécanismes de marché et les bonnes pratiques d’investissement. Tous les contenus sont
          100 % pédagogiques et ne constituent pas des recommandations d’achat ou de vente.
        </p>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mb-6 text-xs md:text-sm">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center px-3 py-1 rounded-full bg-brand-cream text-brand-blue font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Liste d'articles */}
        <div className="grid md:grid-cols-2 gap-5">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="border border-gray-100 rounded-lg p-4 md:p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-brand-cream text-brand-blue font-semibold uppercase tracking-wide">
                  {article.category}
                </span>
                <span>
                  {article.level} • {article.readTime}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-brand-blue mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-700 mb-3">
                {article.excerpt}
              </p>
              <button
                type="button"
                className="text-sm font-semibold text-brand-gold hover:underline"
              >
                Lire le résumé (bientôt)
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprendreArticlesPage;
