// Créez ce nouveau fichier : src/components/home/MarketAndAccountSection.jsx

import React from 'react';
import MarketInfoCard from './MarketInfoCard';
import AccountOpeningCard from './AccountOpeningCard';

const MarketAndAccountSection = () => {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Colonne de gauche */}
          <div>
            <MarketInfoCard />
          </div>
          {/* Colonne de droite */}
          <div>
            <AccountOpeningCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketAndAccountSection;
