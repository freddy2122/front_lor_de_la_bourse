import React from 'react';
import { NavLink } from 'react-router-dom';

const ForumPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Forum</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Forum communautaire (à venir)
        </h1>
        <p className="text-gray-700 mb-4 max-w-3xl">
          Cet espace permettra aux investisseurs et aux personnes qui apprennent la bourse de poser
          des questions, partager des idées et échanger autour de la BRVM. La fonctionnalité sera
          ajoutée dans une prochaine version.
        </p>
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 text-sm">
          Le forum n&apos;est pas encore disponible. Reviens bientôt pour découvrir cette nouvelle
          fonctionnalité.
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
