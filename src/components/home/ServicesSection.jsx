import React from 'react';
import { Briefcase, LineChart, ShieldCheck, Handshake, BookOpen } from 'lucide-react';

const services = [
  { icon: <Briefcase size={24} />, title: 'Courtages', desc: 'Exécution rapide et transparente de vos ordres sur la BRVM.' },
  { icon: <LineChart size={24} />, title: 'Gestion & Conseil', desc: 'Accompagnement stratégique et allocation d’actifs adaptée.' },
  { icon: <ShieldCheck size={24} />, title: 'Conformité & Sécurité', desc: 'Cadre réglementaire strict, sécurité de vos avoirs.' },
  { icon: <Handshake size={24} />, title: 'Introductions en Bourse', desc: 'Structuration et placement des IPOs et levées de fonds.' },
  { icon: <BookOpen size={24} />, title: 'OPCVM', desc: 'Accès aux fonds communs de placement (SICAV, FCP).' },
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-blue">Nos Services</h2>
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto">Une plateforme professionnelle pour investir, se faire accompagner et financer des projets.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 text-brand-blue font-semibold">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-cream">{s.icon}</span>
                <span className="text-lg">{s.title}</span>
              </div>
              <p className="text-gray-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
