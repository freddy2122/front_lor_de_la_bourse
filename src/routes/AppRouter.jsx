import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { setNavigator } from './navigation';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import ClientDashboardLayout from '../components/dashboard_layout/ClientDashboardLayout';
import AdminDashboardLayout from '../components/dashboard_layout/AdminDashboardLayout';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import InscriptionPage from '../pages/InscriptionPage';
import ContactPage from '../pages/ContactPage';
import ActionDetailPage from '../pages/ActionDetailPage';
import DashboardPage from '../pages/DashboardPage';
import PortefeuillePage from '../pages/PortefeuillePage';
import HistoriquePage from '../pages/HistoriquePage';
import ParametresPage from '../pages/ParametresPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminClientsPage from '../pages/admin/AdminClientsPage';
import AdminKycPage from '../pages/admin/AdminKycPage';
import AdminOrdresPage from '../pages/admin/AdminOrdresPage';
import AdminParametresPage from '../pages/admin/AdminParametresPage';
import AdminArticlesPage from '../pages/admin/AdminArticlesPage';
import DemandeSoumisePage from '../pages/DemandeSoumisePage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import Logout from '../pages/Logout';
import PlaceholderPage from '../pages/PlaceholderPage';
import PalmaresHebdoPage from '../pages/PalmaresHebdoPage';
import PublicationsOfficiellesPage from '../pages/PublicationsOfficiellesPage';
import ActualitesPage from '../pages/ActualitesPage';
import ActualiteDetailPage from '../pages/ActualiteDetailPage';
import ActionsPage from '../pages/ActionsPage';
import IndicesPage from '../pages/IndicesPage';

import PrivateRoute from './PrivateRoute';

// Bridge component to register react-router navigate function
const NavigatorBridge = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setNavigator(navigate);
    }, [navigate]);
    return null;
};

const AppRouter = () => {
    return (
        <BrowserRouter>
            <NavigatorBridge />
            <Routes>
                {/* --- GROUPE 1 : Routes Publiques --- */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="action/:ticker" element={<ActionDetailPage />} />
                    <Route path="marches/publications-officielles" element={<PublicationsOfficiellesPage />} />
                    <Route path="marches/actualites" element={<ActualitesPage />} />
                    <Route path="marches/actualites/:slug" element={<ActualiteDetailPage />} />
                    <Route path="marches/actions" element={<ActionsPage />} />
                    <Route path="marches/indices" element={<IndicesPage />} />
                    <Route path="marches/palmares-hebdomadaires" element={<PalmaresHebdoPage />} />
                    <Route path="analyses/analyse-graphique" element={<PlaceholderPage title="Analyses - Analyse graphique" />} />
                    <Route path="analyses/analyse-technique" element={<PlaceholderPage title="Analyses - Analyse technique" />} />
                    <Route path="analyses/dividendes" element={<PlaceholderPage title="Analyses - Dividendes" />} />
                    <Route path="analyses/comparaisons" element={<PlaceholderPage title="Analyses - Comparaisons" />} />
                    <Route path="analyses/indices-boursiers" element={<PlaceholderPage title="Analyses - Indices boursiers" />} />
                    <Route path="analyses/previsions-boursieres" element={<PlaceholderPage title="Analyses - Prévisions boursières" />} />
                    <Route path="analyses/notations-financieres" element={<PlaceholderPage title="Analyses - Notations financières" />} />
                    <Route path="analyses/autres-outils-analyse" element={<PlaceholderPage title="Analyses - Autres outils d'analyse" />} />
                    <Route path="apprendre/articles" element={<PlaceholderPage title="Apprendre - Articles" />} />
                    <Route path="apprendre/guide" element={<PlaceholderPage title="Apprendre - Guide" />} />
                    <Route path="apprendre/quiz" element={<PlaceholderPage title="Apprendre - Quiz" />} />
                    <Route path="apprendre/lexique" element={<PlaceholderPage title="Apprendre - Lexique" />} />
                    <Route path="apprendre/intermediaires-tarifs" element={<PlaceholderPage title="Apprendre - Intermédiaires & tarifs" />} />
                    <Route path="apprendre/liste-societes" element={<PlaceholderPage title="Apprendre - Liste des sociétés cotées" />} />
                    <Route path="apprendre/liste-formateurs" element={<PlaceholderPage title="Apprendre - Liste des formateurs en bourse" />} />
                    <Route path="portefeuille-virtuel/presentation" element={<PlaceholderPage title="Portefeuille virtuel - Présentation" />} />
                    <Route path="portefeuille-virtuel/especes-et-titres" element={<PlaceholderPage title="Portefeuille virtuel - Espèces et titres" />} />
                    <Route path="portefeuille-virtuel/detection-erreurs" element={<PlaceholderPage title="Portefeuille virtuel - Détection des erreurs" />} />
                    <Route path="portefeuille-virtuel/analyse-portefeuille" element={<PlaceholderPage title="Portefeuille virtuel - Analyse du portefeuille" />} />
                    <Route path="portefeuille-virtuel/autres-donnees" element={<PlaceholderPage title="Portefeuille virtuel - Autres données du portefeuille" />} />
                    <Route path="outils/recommandations" element={<PlaceholderPage title="Outils - Recommandations" />} />
                    <Route path="outils/journee-de-cotation" element={<PlaceholderPage title="Outils - Journée de cotation" />} />
                    <Route path="outils/filtrages-societes" element={<PlaceholderPage title="Outils - Filtrages des sociétés" />} />
                    <Route path="outils/classements-societes" element={<PlaceholderPage title="Outils - Classements des sociétés" />} />
                    <Route path="outils/comparaisons-societes" element={<PlaceholderPage title="Outils - Comparaisons des sociétés" />} />
                    <Route path="outils/alertes-franchissement-seuil" element={<PlaceholderPage title="Outils - Alertes franchissement de seuil" />} />
                    <Route path="outils/alertes-publications-officielles" element={<PlaceholderPage title="Outils - Alertes publications officielles" />} />
                    <Route path="outils/autres-outils-analyse" element={<PlaceholderPage title="Outils - Autres outils d'analyse" />} />
                    <Route path="donnees/dividendes-historiques" element={<PlaceholderPage title="Données - Dividendes historiques" />} />
                    <Route path="donnees/rapports-activite" element={<PlaceholderPage title="Données - Rapports d'activité" />} />
                    <Route path="donnees/ratios-par-societe" element={<PlaceholderPage title="Données - Ratios par société (PER, ROE, ...)" />} />
                    <Route path="donnees/ratios-par-secteur" element={<PlaceholderPage title="Données - Ratios par secteur (PER, PBR)" />} />
                    <Route path="forum" element={<PlaceholderPage title="Forum" />} />
                    <Route path="premium" element={<PlaceholderPage title="Premium" />} />
                    <Route path="rechercher" element={<PlaceholderPage title="Rechercher" />} />
                </Route>

                {/* --- GROUPE 2 : Auth --- */}
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="inscription" element={<InscriptionPage />} />
                </Route>

                {/* --- ROUTE 404 --- */}
                <Route path="*" element={
                    <div className="text-center p-20">
                        <h1 className="text-4xl font-bold">404 - Page Non Trouvée</h1>
                    </div>
                } />

                <Route path="/demande-soumise" element={<DemandeSoumisePage />} />
                <Route path="/logout" element={<Logout />} />

                {/* --- GROUPE 3 : Espace Client (role: client) --- */}
                <Route element={<PrivateRoute role="client" />}>
                    <Route element={<ClientDashboardLayout />}>
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="portefeuille" element={<PortefeuillePage />} />
                        <Route path="historique" element={<HistoriquePage />} />
                        <Route path="parametres" element={<ParametresPage />} />
                    </Route>
                </Route>

                {/* --- GROUPE 4 : Espace Admin (role: admin) --- */}
                <Route element={<PrivateRoute role="admin" />}>
                    <Route path="/admin" element={<AdminDashboardLayout />}>
                        <Route path="dashboard" element={<AdminDashboardPage />} />
                        <Route path="clients" element={<AdminClientsPage />} />
                        <Route path="kyc" element={<AdminKycPage />} />
                        <Route path="ordres" element={<AdminOrdresPage />} />
                        <Route path="articles" element={<AdminArticlesPage />} />
                        <Route path="parametres" element={<AdminParametresPage />} />
                    </Route>
                </Route>

                {/* --- ROUTE NON AUTORISÉE --- */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
