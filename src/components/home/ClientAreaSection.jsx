// Créez ce nouveau fichier : src/components/home/ClientAreaSection.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ClientAreaSection = () => {
  return (
    // Utilisation d'un dégradé subtil pour un look premium
    <div className="bg-gradient-to-br from-brand-blue to-blue-900 text-white p-8 rounded-lg shadow-lg h-full flex flex-col justify-center">
      <h3 className="text-3xl font-bold font-display mb-3">Espace Client</h3>
      <p className="text-lg text-gray-300 mb-8">
        Gérez votre portefeuille en ligne, en toute sécurité.
      </p>
      <NavLink 
        to="/login" 
        className="self-start flex items-center bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
      >
        <span>Accéder à l'espace client</span>
        <ArrowRight size={20} className="ml-2" />
      </NavLink>
    </div>
  );
};

export default ClientAreaSection;
