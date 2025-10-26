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
import ServicesPage from '../pages/ServicesPage';
import MarchePage from '../pages/MarchePage';
import AnalysesPage from '../pages/AnalysesPage';
import ContactPage from '../pages/ContactPage';
import OuvrirComptePage from '../pages/OuvrirComptePage';
import EntreprisesPage from '../pages/EntreprisesPage';
import TarifsPage from '../pages/TarifsPage';
import AProposPage from '../pages/AProposPage';
import ApprendrePage from '../pages/ApprendrePage';
import ArticleDetailPage from '../pages/ArticleDetailPage';
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
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="marche" element={<MarchePage />} />
                    <Route path="analyses" element={<AnalysesPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="ouvrir-compte" element={<OuvrirComptePage />} />
                    <Route path="entreprises" element={<EntreprisesPage />} />
                    <Route path="tarifs" element={<TarifsPage />} />
                    <Route path="a-propos" element={<AProposPage />} />
                    <Route path="apprendre" element={<ApprendrePage />} />
                    <Route path="apprendre/:articleId" element={<ArticleDetailPage />} />
                    <Route path="action/:ticker" element={<ActionDetailPage />} />
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
