import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown } from 'lucide-react'; // Importation des icônes

import logoUrl from "@/assets/images/LOR.svg";

const Logo = () => (
  <NavLink to="/" className="flex items-center space-x-3">

    {/* 2. Utilisez le chemin importé dans une balise <img>. */}
    <img src={logoUrl} alt="L'Or de la Bourse Logo" className="w-15 h-10" />


  </NavLink>
);


// Menu pour le desktop
const DesktopMenu = () => {
  const topClass = 'relative font-medium tracking-wide text-white hover:text-brand-gold transition-colors duration-300';
  const menuWrap = 'relative group';
  const dropdown = ' bg-white text-brand-blue rounded-lg shadow-lg py-3 w-full h-full mt-6';
  const item = 'block px-4 py-2 hover:bg-brand-cream hover:text-brand-blue';

  return (
    <nav className="hidden md:flex flex-row items-center space-x-6">
      {/* <NavLink to="/" className={({ isActive }) => `${topClass} ${isActive ? 'text-brand-gold' : ''}`}>Accueil</NavLink> */}

      <div className={menuWrap}>
        <button className={`${topClass} flex items-center gap-1`}>Marchés <ChevronDown size={16} /></button>
        <div className='absolute left-0 top-3 w-72 z-50 hidden group-hover:block'>
          <div className={dropdown}>
            <NavLink to="/marches/publications-officielles" className={item}>Publications officielles</NavLink>
            <NavLink to="/marches/actualites" className={item}>Actualités</NavLink>
            <NavLink to="/marches/actions" className={item}>Actions</NavLink>
            <NavLink to="/marches/indices" className={item}>Indices</NavLink>
            <NavLink to="/marches/palmares-hebdomadaires" className={item}>Palmarès hebdomadaires</NavLink>
          </div>
        </div>
      </div>

      <div className={menuWrap}>
        <button className={`${topClass} flex items-center gap-1`}>Analyses <ChevronDown size={16} /></button>
        <div className='absolute left-0 top-3 w-72 z-50 hidden group-hover:block'>

          <div className={dropdown}>
            <NavLink to="/analyses/analyse-graphique" className={item}>Analyse graphique</NavLink>
            <NavLink to="/analyses/analyse-technique" className={item}>Analyse technique</NavLink>
            <NavLink to="/analyses/dividendes" className={item}>Dividendes</NavLink>
            <NavLink to="/analyses/comparaisons" className={item}>Comparaisons</NavLink>
            <NavLink to="/analyses/indices-boursiers" className={item}>Indices boursiers</NavLink>
            <NavLink to="/analyses/previsions-boursieres" className={item}>Prévisions boursières</NavLink>
            <NavLink to="/analyses/notations-financieres" className={item}>Notations financières</NavLink>
            <NavLink to="/analyses/autres-outils-analyse" className={item}>Autres outils d'analyse</NavLink>
          </div>
        </div>
      </div>

      <div className={menuWrap}>
        <button className={`${topClass} flex items-center gap-1`}>Apprendre <ChevronDown size={16} /></button>
        <div className='absolute left-0 top-2 w-72 z-50 hidden group-hover:block'>

          <div className={dropdown}>
            <NavLink to="/apprendre/articles" className={item}>Articles</NavLink>
            <NavLink to="/apprendre/guide" className={item}>Guide</NavLink>
            <NavLink to="/apprendre/quiz" className={item}>Quiz</NavLink>
            <NavLink to="/apprendre/lexique" className={item}>Lexique</NavLink>
            <NavLink to="/apprendre/intermediaires-tarifs" className={item}>Intermédiaires & tarifs</NavLink>
            <NavLink to="/apprendre/liste-societes" className={item}>Liste des sociétés cotées</NavLink>
            <NavLink to="/apprendre/liste-formateurs" className={item}>Liste des formateurs en bourse</NavLink>
          </div>
        </div>
      </div>

      <div className={menuWrap}>
        <button className={`${topClass} flex items-center gap-1`}>Portefeuille virtuel <ChevronDown size={16} /></button>
        <div className='absolute left-0 top-2 w-72 z-50 hidden group-hover:block'>
          <div className={dropdown}>
            <NavLink to="/portefeuille-virtuel/presentation" className={item}>Présentation</NavLink>
            <NavLink to="/portefeuille-virtuel/especes-et-titres" className={item}>Espèces et titres</NavLink>
            <NavLink to="/portefeuille-virtuel/detection-erreurs" className={item}>Détection des erreurs</NavLink>
            <NavLink to="/portefeuille-virtuel/analyse-portefeuille" className={item}>Analyse du portefeuille</NavLink>
            <NavLink to="/portefeuille-virtuel/autres-donnees" className={item}>Autres données du portefeuille</NavLink>
          </div>
        </div>

      </div>

      <div className={menuWrap}>
        <button className={`${topClass} flex items-center gap-1`}>Outils <ChevronDown size={16} /></button>
        <div className='absolute left-0 top-2 w-72 z-50 hidden group-hover:block'>

          <div className={dropdown}>
            <NavLink to="/outils/recommandations" className={item}>Recommandations</NavLink>
            <NavLink to="/outils/journee-de-cotation" className={item}>Journée de cotation</NavLink>
            <NavLink to="/outils/filtrages-societes" className={item}>Filtrages des sociétés</NavLink>
            <NavLink to="/outils/classements-societes" className={item}>Classements des sociétés</NavLink>
            <NavLink to="/outils/comparaisons-societes" className={item}>Comparaisons des sociétés</NavLink>
            <NavLink to="/outils/alertes-franchissement-seuil" className={item}>Alertes franchissement de seuil</NavLink>
            <NavLink to="/outils/alertes-publications-officielles" className={item}>Alertes publications officielles</NavLink>
            <NavLink to="/outils/autres-outils-analyse" className={item}>Autres outils d'analyse</NavLink>
          </div>
        </div>

      </div>

      <div className={menuWrap}>
        <button className={`${topClass} flex items-center gap-1`}>Données <ChevronDown size={16} /></button>
        <div className='absolute left-0 top-2 w-72 z-50 hidden group-hover:block'>
          <div className={dropdown}>
            <NavLink to="/donnees/dividendes-historiques" className={item}>Dividendes historiques</NavLink>
            <NavLink to="/donnees/rapports-activite" className={item}>Rapports d'activité</NavLink>
            <NavLink to="/donnees/ratios-par-societe" className={item}>Ratios par société (PER, ROE, ...)</NavLink>
            <NavLink to="/donnees/ratios-par-secteur" className={item}>Ratios par secteur (PER, PBR)</NavLink>
          </div>
        </div>


      </div>

      <NavLink to="/forum" className={({ isActive }) => `${topClass} ${isActive ? 'text-brand-gold' : ''}`}>Forum</NavLink>
      <NavLink to="/premium" className={({ isActive }) => `${topClass} ${isActive ? 'text-brand-gold' : ''}`}>Premium</NavLink>
      <NavLink to="/contact" className={({ isActive }) => `${topClass} ${isActive ? 'text-brand-gold' : ''}`}>Contact</NavLink>
    </nav>
  );
};

// Bouton de connexion
const LoginButton = () => (
  <div className="hidden md:flex items-center gap-4 justify-center">
    <NavLink to="/inscription" className="text-white hover:text-brand-gold font-medium">Inscription</NavLink>
    <NavLink to="/login" className="flex items-center justify-center gap-2 bg-brand-gold text-brand-blue font-bold py-2 px-5 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-300">
      <span>Connexion</span>
      <LogIn size={18} />
    </NavLink>
  </div>
);

// Menu pour le mobile
const MobileMenu = ({ isOpen, setIsOpen }) => {
  const [open, setOpen] = useState({});
  const toggle = (k) => setOpen((s) => ({ ...s, [k]: !s[k] }));

  const section = (label, key, links) => (
    <div className="w-full" key={key}>
      <button onClick={() => toggle(key)} className="w-full flex items-center justify-between text-white text-xl py-3 px-6">
        <span>{label}</span>
        <ChevronDown className={`transition-transform ${open[key] ? 'rotate-180' : ''}`} />
      </button>
      {open[key] && (
        <div className="flex flex-col gap-2 px-8 pb-3">
          {links.map(([to, text]) => (
            <NavLink key={to} to={to} onClick={() => setIsOpen(false)} className="text-white/90 hover:text-brand-gold text-lg">
              {text}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`absolute top-0 left-0 w-full h-screen bg-brand-blue z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
      <div className="flex justify-end p-4">
        <button onClick={() => setIsOpen(false)} className="text-white">
          <X size={28} />
        </button>
      </div>
      <nav className="flex flex-col items-start h-[calc(100vh-64px)] overflow-y-auto space-y-1 text-2xl w-full">
        <NavLink to="/" className="text-white px-6 py-3" onClick={() => setIsOpen(false)}>Accueil</NavLink>

        {section('Marchés', 'marches', [
          ['/marches/publications-officielles', 'Publications officielles'],
          ['/marches/actualites', 'Actualités'],
          ['/marches/actions', 'Actions'],
          ['/marches/indices', 'Indices'],
          ['/marches/palmares-hebdomadaires', 'Palmarès hebdomadaires'],
        ])}

        {section('Analyses', 'analyses', [
          ['/analyses/analyse-graphique', 'Analyse graphique'],
          ['/analyses/analyse-technique', 'Analyse technique'],
          ['/analyses/dividendes', 'Dividendes'],
          ['/analyses/comparaisons', 'Comparaisons'],
          ['/analyses/indices-boursiers', 'Indices boursiers'],
          ['/analyses/previsions-boursieres', 'Prévisions boursières'],
          ['/analyses/notations-financieres', 'Notations financières'],
          ["/analyses/autres-outils-analyse", "Autres outils d'analyse"],
        ])}

        {section('Apprendre', 'apprendre', [
          ['/apprendre/articles', 'Articles'],
          ['/apprendre/guide', 'Guide'],
          ['/apprendre/quiz', 'Quiz'],
          ['/apprendre/lexique', 'Lexique'],
          ['/apprendre/intermediaires-tarifs', 'Intermédiaires & tarifs'],
          ['/apprendre/liste-societes', 'Liste des sociétés cotées'],
          ['/apprendre/liste-formateurs', 'Liste des formateurs en bourse'],
        ])}

        {section('Portefeuille virtuel', 'pv', [
          ['/portefeuille-virtuel/presentation', 'Présentation'],
          ['/portefeuille-virtuel/especes-et-titres', 'Espèces et titres'],
          ['/portefeuille-virtuel/detection-erreurs', 'Détection des erreurs'],
          ['/portefeuille-virtuel/analyse-portefeuille', 'Analyse du portefeuille'],
          ['/portefeuille-virtuel/autres-donnees', 'Autres données du portefeuille'],
        ])}

        {section('Outils', 'outils', [
          ['/outils/recommandations', 'Recommandations'],
          ['/outils/journee-de-cotation', 'Journée de cotation'],
          ['/outils/filtrages-societes', 'Filtrages des sociétés'],
          ['/outils/classements-societes', 'Classements des sociétés'],
          ['/outils/comparaisons-societes', 'Comparaisons des sociétés'],
          ['/outils/alertes-franchissement-seuil', 'Alertes franchissement de seuil'],
          ['/outils/alertes-publications-officielles', 'Alertes publications officielles'],
          ["/outils/autres-outils-analyse", "Autres outils d'analyse"],
        ])}

        {section('Données', 'donnees', [
          ['/donnees/dividendes-historiques', 'Dividendes historiques'],
          ['/donnees/rapports-activite', "Rapports d'activité"],
          ['/donnees/ratios-par-societe', 'Ratios par société (PER, ROE, ...)'],
          ['/donnees/ratios-par-secteur', 'Ratios par secteur (PER, PBR)'],
        ])}

        <NavLink to="/forum" className="text-white px-6 py-3" onClick={() => setIsOpen(false)}>Forum</NavLink>
        <NavLink to="/premium" className="text-white px-6 py-3" onClick={() => setIsOpen(false)}>Premium</NavLink>
        <NavLink to="/rechercher" className="text-white px-6 py-3" onClick={() => setIsOpen(false)}>Rechercher</NavLink>
        <NavLink to="/contact" className="text-white px-6 py-3" onClick={() => setIsOpen(false)}>Contact</NavLink>

        <div className="h-px w-full bg-white/10 my-2" />
        <NavLink to="/inscription" className="text-white px-6 py-3" onClick={() => setIsOpen(false)}>Inscription</NavLink>
        <NavLink to="/login" className="flex items-center gap-2 mx-6 mt-2 bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full" onClick={() => setIsOpen(false)}>
          <span>Connexion</span>
          <LogIn size={20} />
        </NavLink>
      </nav>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-brand-blue font-sans sticky top-0 z-50 shadow-lg">
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />
            <LoginButton />
            {/* Bouton pour ouvrir le menu mobile */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(true)} className="text-white">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 justify-center">
            <DesktopMenu />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Navbar;
