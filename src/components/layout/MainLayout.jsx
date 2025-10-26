// src/components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Importez la nouvelle Navbar
import Footer from './Footer';
import MarketTicker from './MarketTicker';

const MainLayout = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      <Navbar /> {/* Utilisez-la ici */}
      <MarketTicker />
      <main>
        {/* Le contenu de la page sera injecté ici par le routeur */}
        <Outlet />
      </main>
      {/* Vous pouvez ajouter un Footer ici plus tard */}
      <Footer />
    </div>
  );
};

export default MainLayout;
