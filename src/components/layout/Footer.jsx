import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import logoUrl from "@/assets/images/LOR.svg";

// Composant réutilisable pour les titres de section du footer
const FooterSectionTitle = ({ children }) => (
  <h3 className="font-display text-lg font-bold text-brand-gold mb-4 tracking-wider uppercase">
    {children}
  </h3>
);

// Composant réutilisable pour les liens du footer
const FooterLink = ({ to, children }) => (
  <NavLink to={to} className="text-gray-300 hover:text-white hover:underline transition-colors duration-300">
    {children}
  </NavLink>
);

const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white font-sans pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Colonne 1: Logo et Mission */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
                  <img src={logoUrl} alt="L'Or de la Bourse Logo" className="w-15 h-10" />
              
            </div>
            <p className="text-gray-400 text-sm pr-4">
              Votre partenaire de confiance pour naviguer avec succès sur le marché financier de l'UEMOA.
            </p>
          </div>

          {/* Colonne 2: Navigation Rapide */}
          <div>
            <FooterSectionTitle>Navigation</FooterSectionTitle>
            <ul className="space-y-3">
              <li><FooterLink to="/">Accueil</FooterLink></li>
              <li><FooterLink to="/services">Nos Services</FooterLink></li>
              <li><FooterLink to="/marche">Le Marché en Direct</FooterLink></li>
              <li><FooterLink to="/analyses">Actualité & Analyse</FooterLink></li>
            </ul>
          </div>

          {/* Colonne 3: Légal & Utile */}
          <div>
            <FooterSectionTitle>L'Entreprise</FooterSectionTitle> {/* On peut renommer la section */}
            <ul className="space-y-3">
              <li><FooterLink to="/a-propos">À Propos de nous</FooterLink></li> {/* <-- LIEN AJOUTÉ */}
              <li><FooterLink to="/tarifs">Nos Tarifs</FooterLink></li> {/* <-- LIEN AJOUTÉ */}
              <li><FooterLink to="/contact">Nous Contacter</FooterLink></li>
              <li><FooterLink to="/faq">FAQ</FooterLink></li>
            </ul>
          </div>

          {/* Colonne 4: Suivez-nous */}
          <div>
            <FooterSectionTitle>Suivez-nous</FooterSectionTitle>
            <p className="text-gray-400 text-sm mb-4">
              Restez connecté à l'actualité des marchés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors duration-300"><Facebook size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors duration-300"><Twitter size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors duration-300"><Linkedin size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors duration-300"><Youtube size={22} /></a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          
          {/* Avertissement sur les risques */}
          <div className="text-center text-xs text-gray-500 mb-6">
            <p className="font-bold mb-1">Avertissement sur les risques :</p>
            <p>
              L'investissement en bourse comporte des risques de perte en capital. Les performances passées ne préjugent pas des performances futures. 
              L'Or de la Bourse est une Société de Gestion et d'Intermédiation agréée par le CREPMF sous le numéro [Votre Numéro d'Agrément].
            </p>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} L'Or de la Bourse. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
