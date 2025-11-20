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
import AnalyseGraphiquePage from '../pages/AnalyseGraphiquePage';
import AnalysesDividendesPage from '../pages/AnalysesDividendesPage';
import AnalysesComparaisonsPage from '../pages/AnalysesComparaisonsPage';
import AnalysesAnalyseTechniquePage from '../pages/AnalysesAnalyseTechniquePage';
import AnalysesIndicesBoursiersPage from '../pages/AnalysesIndicesBoursiersPage';
import AnalysesPrevisionsBoursieresPage from '../pages/AnalysesPrevisionsBoursieresPage';
import AnalysesNotationsFinancieresPage from '../pages/AnalysesNotationsFinancieresPage';
import AnalysesAutresOutilsAnalysePage from '../pages/AnalysesAutresOutilsAnalysePage';
import GuideApprendrePage from '../pages/GuideApprendrePage';
import ApprendreArticlesPage from '../pages/ApprendreArticlesPage';
import ApprendreLexiquePage from '../pages/ApprendreLexiquePage';
import ApprendreIntermediairesTarifsPage from '../pages/ApprendreIntermediairesTarifsPage';
import ApprendreQuizPage from '../pages/ApprendreQuizPage';
import ApprendreListeSocietesPage from '../pages/ApprendreListeSocietesPage';
import ApprendreListeFormateursPage from '../pages/ApprendreListeFormateursPage';
import PortefeuilleVirtuelPresentationPage from '../pages/PortefeuilleVirtuelPresentationPage';
import OutilsRecommandationsPage from '../pages/OutilsRecommandationsPage';
import OutilsJourneeDeCotationPage from '../pages/OutilsJourneeDeCotationPage';
import OutilsFiltragesSocietesPage from '../pages/OutilsFiltragesSocietesPage';
import OutilsClassementsSocietesPage from '../pages/OutilsClassementsSocietesPage';
import OutilsComparaisonsSocietesPage from '../pages/OutilsComparaisonsSocietesPage';
import OutilsAlertesFranchissementSeuilPage from '../pages/OutilsAlertesFranchissementSeuilPage';
import OutilsAlertesPublicationsOfficiellesPage from '../pages/OutilsAlertesPublicationsOfficiellesPage';
import OutilsAutresOutilsAnalysePage from '../pages/OutilsAutresOutilsAnalysePage';
import PortefeuilleVirtuelEspecesEtTitresPage from '../pages/PortefeuilleVirtuelEspecesEtTitresPage';
import PortefeuilleVirtuelDetectionErreursPage from '../pages/PortefeuilleVirtuelDetectionErreursPage';
import PortefeuilleVirtuelAnalysePortefeuillePage from '../pages/PortefeuilleVirtuelAnalysePortefeuillePage';
import PortefeuilleVirtuelAutresDonneesPage from '../pages/PortefeuilleVirtuelAutresDonneesPage';
import DonneesDividendesHistoriquesPage from '../pages/DonneesDividendesHistoriquesPage';
import DonneesRapportsActivitePage from '../pages/DonneesRapportsActivitePage';
import DonneesRatiosParSocietePage from '../pages/DonneesRatiosParSocietePage';
import DonneesRatiosParSecteurPage from '../pages/DonneesRatiosParSecteurPage';
import ForumPage from '../pages/ForumPage';
import PremiumPage from '../pages/PremiumPage';
import RechercherPage from '../pages/RechercherPage';

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
                    <Route path="analyses/analyse-graphique" element={<AnalyseGraphiquePage />} />
                    <Route path="analyses/analyse-technique" element={<AnalysesAnalyseTechniquePage />} />
                    <Route path="analyses/dividendes" element={<AnalysesDividendesPage />} />
                    <Route path="analyses/comparaisons" element={<AnalysesComparaisonsPage />} />
                    <Route path="analyses/indices-boursiers" element={<AnalysesIndicesBoursiersPage />} />
                    <Route path="analyses/previsions-boursieres" element={<AnalysesPrevisionsBoursieresPage />} />
                    <Route path="analyses/notations-financieres" element={<AnalysesNotationsFinancieresPage />} />
                    <Route path="analyses/autres-outils-analyse" element={<AnalysesAutresOutilsAnalysePage />} />
                    <Route path="apprendre/articles" element={<ApprendreArticlesPage />} />
                    <Route path="apprendre/guide" element={<GuideApprendrePage />} />
                    <Route path="apprendre/quiz" element={<ApprendreQuizPage />} />
                    <Route path="apprendre/lexique" element={<ApprendreLexiquePage />} />
                    <Route path="apprendre/intermediaires-tarifs" element={<ApprendreIntermediairesTarifsPage />} />
                    <Route path="apprendre/liste-societes" element={<ApprendreListeSocietesPage />} />
                    <Route path="apprendre/liste-formateurs" element={<ApprendreListeFormateursPage />} />
                    <Route path="portefeuille-virtuel/presentation" element={<PortefeuilleVirtuelPresentationPage />} />
                    <Route path="portefeuille-virtuel/especes-et-titres" element={<PortefeuilleVirtuelEspecesEtTitresPage />} />
                    <Route path="portefeuille-virtuel/detection-erreurs" element={<PortefeuilleVirtuelDetectionErreursPage />} />
                    <Route path="portefeuille-virtuel/analyse-portefeuille" element={<PortefeuilleVirtuelAnalysePortefeuillePage />} />
                    <Route path="portefeuille-virtuel/autres-donnees" element={<PortefeuilleVirtuelAutresDonneesPage />} />
                    <Route path="outils/recommandations" element={<OutilsRecommandationsPage />} />
                    <Route path="outils/journee-de-cotation" element={<OutilsJourneeDeCotationPage />} />
                    <Route path="outils/filtrages-societes" element={<OutilsFiltragesSocietesPage />} />
                    <Route path="outils/classements-societes" element={<OutilsClassementsSocietesPage />} />
                    <Route path="outils/comparaisons-societes" element={<OutilsComparaisonsSocietesPage />} />
                    <Route path="outils/alertes-franchissement-seuil" element={<OutilsAlertesFranchissementSeuilPage />} />
                    <Route path="outils/alertes-publications-officielles" element={<OutilsAlertesPublicationsOfficiellesPage />} />
                    <Route path="outils/autres-outils-analyse" element={<OutilsAutresOutilsAnalysePage />} />
                    <Route path="donnees/dividendes-historiques" element={<DonneesDividendesHistoriquesPage />} />
                    <Route path="donnees/rapports-activite" element={<DonneesRapportsActivitePage />} />
                    <Route path="donnees/ratios-par-societe" element={<DonneesRatiosParSocietePage />} />
                    <Route path="donnees/ratios-par-secteur" element={<DonneesRatiosParSecteurPage />} />
                    <Route path="forum" element={<ForumPage />} />
                    <Route path="premium" element={<PremiumPage />} />
                    <Route path="rechercher" element={<RechercherPage />} />
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
