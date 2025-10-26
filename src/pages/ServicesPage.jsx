import React from 'react';
import { Briefcase, BarChart2, ShieldCheck } from 'lucide-react';

// Un composant interne pour représenter une carte de service
const ServiceCard = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center w-16 h-16 mb-6 bg-brand-cream rounded-full">
      {icon}
    </div>
    <h3 className="text-2xl font-bold font-display text-brand-blue mb-4">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Nos Services</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Nous vous offrons une gamme complète de solutions pour vous accompagner dans vos décisions d'investissement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ServiceCard icon={<Briefcase size={32} className="text-brand-blue" />}>
          Gestion de Portefeuille
        </ServiceCard>
        <ServiceCard icon={<BarChart2 size={32} className="text-brand-blue" />}>
          Conseil en Investissement
        </ServiceCard>
        <ServiceCard icon={<ShieldCheck size={32} className="text-brand-blue" />}>
          Conservation de Titres
        </ServiceCard>
      </div>
    </div>
  );
};

export default ServicesPage;
