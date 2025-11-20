import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// 1. Importez votre logo
import logoSrc from '../../assets/images/LOR.svg'; 

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* --- Colonne de Gauche (Visuelle et Épurée) --- */}
          <div className="relative lg:w-1/2 bg-brand-blue p-8 md:p-12 flex flex-col items-center justify-center text-white text-center">
            
            {/* Contenu centré */}
            <div className="relative z-10">
              <NavLink to="/" className="block">
                {/* 2. Affichez votre logo importé */}
                <img 
                  src={logoSrc} 
                  alt="Logo L'Or de la Bourse" 
                  className="w-24 h-24 mx-auto mb-6" // Ajustez la taille (w-24 h-24) selon votre logo
                />
                <h1 className="text-4xl font-extrabold font-display">
                  L'Or de la <span className="text-brand-gold">Bourse</span>
                </h1>
              </NavLink>
              <p className="text-lg text-gray-300 max-w-sm mt-4">
                Votre porte d'entrée privilégiée pour accéder aux opportunités de la BRVM.
              </p>
            </div>
          </div>

          {/* --- Colonne de Droite (Formulaire) --- */}
          <div className="lg:w-1/2  md:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <Outlet /> {/* C'est ici que LoginPage ou InscriptionPage s'afficheront */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
