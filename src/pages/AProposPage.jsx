import React from 'react';
import { Award, Target, Users, CheckCircle } from 'lucide-react';

const AProposPage = () => {
  return (
    <div className="bg-brand-cream py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section principale */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">À Propos de L'Or de la Bourse</h1>
          <p className="mt-4 text-lg text-gray-700">
            Votre partenaire de confiance pour démocratiser l'investissement et révéler le potentiel du marché financier de l'UEMOA.
          </p>
        </div>

        {/* Notre Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Target className="w-10 h-10 text-brand-gold mr-4" />
              <h2 className="text-3xl font-bold text-brand-blue">Notre Mission</h2>
            </div>
            <p className="text-gray-600">
              Offrir à chaque investisseur, du novice à l'expert, les outils, les connaissances et l'accès direct au marché pour bâtir un avenir financier solide et prospère au sein de notre région.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Users className="w-10 h-10 text-brand-gold mr-4" />
              <h2 className="text-3xl font-bold text-brand-blue">Notre Équipe</h2>
            </div>
            <p className="text-gray-600">
              Nous sommes une équipe de financiers passionnés, d'experts du marché et d'ingénieurs technologiques, unis par la volonté de rendre la bourse plus accessible, transparente et performante pour tous.
            </p>
          </div>
        </div>

        {/* Section Réglementation (CRUCIALE) */}
        <div className="max-w-4xl mx-auto bg-brand-blue text-white p-8 md:p-10 rounded-lg text-center shadow-xl">
          <Award className="w-16 h-16 mx-auto mb-4 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mb-4">Un Acteur Réglementé et de Confiance</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            L'Or de la Bourse est une Société de Gestion et d'Intermédiation (SGI) dûment agréée par le Conseil Régional de l’Épargne Publique et des Marchés Financiers (CREPMF).
          </p>
          <div className="mt-6 bg-white text-brand-blue font-mono font-bold text-xl p-4 rounded-md inline-block">
            Agrément N° : [SGI/CREPMF/XXXX/2025]
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Cet agrément garantit que nos opérations respectent les normes les plus strictes en matière de sécurité des fonds, de transparence et d'éthique professionnelle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AProposPage;
