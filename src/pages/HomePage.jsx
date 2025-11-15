import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ShieldCheck, BarChart3, BrainCircuit } from 'lucide-react';
import NewsSection from '../components/home/NewsSection';
import ClientAreaSection from '../components/home/ClientAreaSection';
import MarketAndAccountSection from '../components/home/MarketAndAccountSection';
import VideoBackground from '../components/common/VideoBackground';
import IndicesRibbon from '../components/home/IndicesRibbon';
// Ruban de marché BRVM alimenté par l'API: GET /api/market/quotes-list
import MarketTicker from '../components/layout/MarketTicker';
// Activités du marché (GET /api/market/summary)
import MarketSummary from '../components/home/MarketSummary';
import ServicesSection from '../components/home/ServicesSection';
import AppKycCtaSection from '../components/home/AppKycCtaSection';

// Un composant interne pour les cartes d'arguments clés
const FeatureCard = ({ icon, title, children }) => (
    <div className="text-center p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-brand-gold rounded-full">
            {icon}
        </div>
        <h3 className="text-xl font-bold font-display text-brand-blue">{title}</h3>
        <p className="mt-2 text-gray-600">{children}</p>
    </div>
);

const HomePage = () => {
    return (
        <div className="font-sans">
            {/* Section Héros (Hero Section) */}
            <section className="relative  text-white py-20 md:py-32 text-center">
                <VideoBackground />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight">
                        Investissez avec <span className="text-brand-gold">Confiance</span> sur le Marché Régional
                    </h1>
                    <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
                        L'Or de la Bourse est votre porte d'entrée privilégiée pour accéder aux opportunités de la BRVM et bâtir votre patrimoine.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <NavLink
                            to="/login"
                            className="flex items-center justify-center w-full sm:w-auto bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
                        >
                            <span>Commencer à investir</span>
                            <ArrowRight className="ml-2" size={20} />
                        </NavLink>
                        <NavLink
                            to="/premium"
                            className="w-full sm:w-auto font-semibold py-3 px-8 rounded-full text-lg border-2 border-white hover:bg-white hover:text-brand-blue transition-colors duration-300"
                        >
                            Découvrir nos services
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* Bandeau indices BRVM (consomme GET /api/market/indices) */}
            <IndicesRibbon />

            {/* Ruban des cotes BRVM (consomme GET /api/market/quotes-list) */}
            <MarketTicker />

            {/* Activités du marché (valeur des transactions, capitalisations, indices clés) */}
            <MarketSummary />

            {/* Section des Arguments Clés (Features) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-blue">Pourquoi nous choisir ?</h2>
                        <p className="mt-3 text-gray-600">L'expertise au service de votre réussite financière.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard icon={<ShieldCheck size={32} className="text-brand-blue" />}>
                            Sécurité & Conformité
                        </FeatureCard>
                        <FeatureCard icon={<BarChart3 size={32} className="text-brand-blue" />}>
                            Accès Direct au Marché
                        </FeatureCard>
                        <FeatureCard icon={<BrainCircuit size={32} className="text-brand-blue" />}>
                            Analyses d'Experts
                        </FeatureCard>
                    </div>
                </div>
            </section>

            {/* Nos Services */}
            <ServicesSection />

            {/* App mobile / Onboarding KYC */}
            <AppKycCtaSection />

            <section className="py-20 bg-brand-cream">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Colonne de gauche */}
                        <div>
                            <NewsSection />
                        </div>
                        {/* Colonne de droite */}
                        <div>
                            <ClientAreaSection />
                        </div>
                    </div>
                </div>
            </section>
            <MarketAndAccountSection />

        </div>
    );
};

export default HomePage;
