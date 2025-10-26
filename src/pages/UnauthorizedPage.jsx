// src/pages/UnauthorizedPage.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-10 bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-6">Accès non autorisé</h2>
      <p className="mb-6 text-gray-700">
        Vous n’avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <NavLink
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Retour à l'accueil
      </NavLink>
    </div>
  );
};

export default UnauthorizedPage;
