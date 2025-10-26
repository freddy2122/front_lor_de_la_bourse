import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react'; // Importation des icônes

import logoUrl from "@/assets/images/LOR.svg";

const Logo = () => (
  <NavLink to="/" className="flex items-center space-x-3">
    
    {/* 2. Utilisez le chemin importé dans une balise <img>. */}
    <img src={logoUrl} alt="L'Or de la Bourse Logo" className="w-15 h-10" />
    
    
  </NavLink>
);


// Menu pour le desktop
const DesktopMenu = () => {
  const navLinkClass = ({ isActive }) =>
    `relative font-medium tracking-wide transition-colors duration-300
     ${isActive ? 'text-brand-gold' : 'text-white'}
     hover:text-brand-gold
     after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-300
     ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}`;

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink to="/" className={navLinkClass}>Accueil</NavLink>
      <NavLink to="/services" className={navLinkClass}>Services</NavLink>
      <NavLink to="/marche" className={navLinkClass}>Marché</NavLink>
      <NavLink to="/analyses" className={navLinkClass}>Actualité & Analyse</NavLink>
      <NavLink to="/tarifs" className={navLinkClass}>Tarifs</NavLink>
      <NavLink to="/apprendre" className={navLinkClass}>Apprendre</NavLink>
    </nav>
  );
};

// Bouton de connexion
const LoginButton = () => (
  <NavLink to="/login" className="hidden md:flex items-center justify-center space-x-2 bg-brand-gold text-brand-blue font-bold py-2 px-5 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
    <span>Devenir client</span>
    <LogIn size={18} />
  </NavLink>
);

// Menu pour le mobile
const MobileMenu = ({ isOpen, setIsOpen }) => (
  <div className={`absolute top-0 left-0 w-full h-screen bg-brand-blue z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
    <div className="flex justify-end p-4">
      <button onClick={() => setIsOpen(false)} className="text-white">
        <X size={28} />
      </button>
    </div>
    <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
      <NavLink to="/" className="text-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Accueil</NavLink>
      <NavLink to="/services" className="text-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Services</NavLink>
      <NavLink to="/marche" className="text-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Marché</NavLink>
      <NavLink to="/analyses" className="text-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Actualité & Analyse</NavLink>
      <NavLink to="/tarifs" className="text-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Tarifs</NavLink>
      <NavLink to="/apprendre" className="text-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Apprendre</NavLink>
      <NavLink to="/login" className="flex items-center space-x-2 mt-8 bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full">
        <span>Connexion</span>
        <LogIn size={20} />
      </NavLink>
    </nav>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-brand-blue font-sans sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <DesktopMenu />
          <LoginButton />
          
          {/* Bouton pour ouvrir le menu mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} className="text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Navbar;
