// Créez ce nouveau fichier : src/components/home/NewsSection.jsx

import React from 'react';
import { ArrowRight } from 'lucide-react';

// Données factices pour les actualités
const newsItems = [
  { id: 1, title: 'La BRVM clôture en hausse, tirée par le secteur des télécoms.', date: '25 août 2025' },
  { id: 2, title: 'Analyse : perspectives du secteur agricole en Côte d\'Ivoire.', date: '24 août 2025' },
  { id: 3, title: 'Nouvelle introduction en bourse attendue au T4 2025.', date: '22 août 2025' },
];

const NewsSection = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full">
      <h3 className="text-2xl font-bold font-display text-brand-blue mb-6">Actualité Boursière</h3>
      <div className="space-y-5">
        {newsItems.map(item => (
          <div key={item.id} className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-500 mb-1">{item.date}</p>
            <a href="#" className="font-semibold text-gray-800 hover:text-brand-gold transition-colors">
              {item.title}
            </a>
          </div>
        ))}
      </div>
      <a href="/analyses" className="flex items-center mt-6 font-bold text-brand-gold hover:underline">
        <span>Toutes les actualités</span>
        <ArrowRight size={18} className="ml-2" />
      </a>
    </div>
  );
};

export default NewsSection;
