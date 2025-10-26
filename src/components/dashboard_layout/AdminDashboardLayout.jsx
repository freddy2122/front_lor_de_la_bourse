import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Users, FileCheck, Clock, BarChartBig, Settings, LogOut, Menu, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const adminNavItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: BarChartBig },
  { name: 'Gestion Clients', path: '/admin/clients', icon: Users },
  { name: 'Validations (KYC)', path: '/admin/kyc', icon: FileCheck },
  { name: 'Gestion des Articles', path: '/admin/articles', icon: FileText },
  { name: 'Gestion des Ordres', path: '/admin/ordres', icon: Clock },
  { name: 'Paramètres Admin', path: '/admin/parametres', icon: Settings },
];

const AdminSidebar = ({ onLinkClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();           // Supprime token et user
      navigate('/login');       // Redirige vers login
    } catch (err) {
      console.error('Erreur lors de la déconnexion :', err);
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-gray-300 h-full flex flex-col">
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">
          Admin L'Or<span className="text-brand-gold">Bourse</span>
        </h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {adminNavItems.map(item => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={onLinkClick} // Fermer menu mobile
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-brand-gold text-gray-800 font-bold' : 'hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="mr-3" size={20} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-red-700 text-white"
        >
          <LogOut className="mr-3" size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar desktop */}
      <div className="hidden lg:block flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-64 h-full">
            <AdminSidebar onLinkClick={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700">
            <Menu size={28} />
          </button>
          <h2 className="font-semibold text-gray-800">Administrateur</h2>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet /> {/* Affiche la page active */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
