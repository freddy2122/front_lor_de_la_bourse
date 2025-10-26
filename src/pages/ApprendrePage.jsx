import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, BarChart, HelpCircle } from 'lucide-react';

// Données factices pour les articles
const articles = [
  { id: 'lexique-boursier', title: 'Le Lexique du Boursicoteur', category: 'Les Bases', summary: 'Découvrez les définitions claires des termes essentiels de la bourse : action, obligation, dividende, et bien plus.' },
  { id: 'passer-un-ordre', title: 'Comment Passer son Premier Ordre ?', category: 'Guides Pratiques', summary: 'Un guide étape par étape pour vous accompagner dans votre toute première transaction sur le marché.' },
  { id: 'analyser-une-action', title: 'Les 5 Ratios Clés pour Analyser une Action', category: 'Analyse Fondamentale', summary: 'Apprenez à évaluer la santé financière d\'une entreprise avec des indicateurs simples mais puissants.' },
];

const ApprendrePage = () => {
  return (
    <div className="bg-brand-cream py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Titre principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-brand-gold" />
          <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Espace Apprendre</h1>
          <p className="mt-4 text-lg text-gray-700">
            Parce qu'un investisseur informé est un investisseur performant. Découvrez nos guides et articles pour maîtriser le marché.
          </p>
        </div>

        {/* Grille des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <NavLink 
              key={article.id}
              to={`/apprendre/${article.id}`} 
              className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-sm font-bold text-brand-blue bg-brand-cream px-3 py-1 rounded-full">{article.category}</span>
              <h2 className="text-xl font-bold font-display text-brand-blue mt-4 mb-2">{article.title}</h2>
              <p className="text-gray-600">{article.summary}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprendrePage;
