import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Wallet, History, Settings, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Tableau de Bord', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Mon Portefeuille', path: '/portefeuille', icon: Wallet },
  { name: 'Historique', path: '/historique', icon: History },
  { name: 'Paramètres', path: '/parametres', icon: Settings },
];

const Sidebar = ({ isMobile, onLinkClick }) => (
  <aside className={`bg-brand-blue text-white ${isMobile ? 'w-full' : 'w-64'} h-full flex flex-col`}>
    <div className="p-6 text-center border-b border-blue-800">
      <NavLink to="/" className="text-2xl font-bold font-display">
        L'Or de la <span className="text-brand-gold">Bourse</span>
      </NavLink>
    </div>
    <nav className="flex-grow p-4">
      <ul>
        {navItems.map(item => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-brand-gold text-brand-blue' : 'hover:bg-blue-800'
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
    <div className="p-4 border-t border-blue-800">
      <NavLink to="/logout" className="flex items-center px-4 py-3 rounded-lg hover:bg-red-700">
        <LogOut className="mr-3" size={20} />
        <span>Déconnexion</span>
      </NavLink>
    </div>
  </aside>
);

const ClientDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-brand-cream">
      {/* Sidebar pour Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar pour Mobile (avec overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative w-64 h-full">
            <Sidebar isMobile onLinkClick={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex justify-between items-center lg:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-brand-blue">
            <Menu size={28} />
          </button>
          <div className="flex items-center">
            <span className="font-semibold mr-4">Bonjour, [Prénom Client]</span>
            <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet /> {/* C'est ici que les pages comme DashboardPage s'afficheront */}
        </main>
      </div>
    </div>
   );
};

export default ClientDashboardLayout;
