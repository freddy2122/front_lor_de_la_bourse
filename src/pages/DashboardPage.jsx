import React from 'react';
import { NavLink } from 'react-router-dom';
import { PlusCircle, ArrowRightCircle, Download, TrendingUp, PieChart, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import useMarketStream from '../hooks/useMarketStream';

// Données factices pour le tableau de bord du client
const portfolioValue = 5275000;
const portfolioChange = 75000;
const portfolioChangePercent = 1.44;

const holdings = [
  { ticker: 'SONATEL', name: 'Sonatel', quantity: 100, value: 1750000, change: 1.45 },
  { ticker: 'BOAC', name: 'Bank of Africa - CI', quantity: 250, value: 1625000, change: -1.52 },
  { ticker: 'CORIS', name: 'Coris Bank Int.', quantity: 194, value: 1901200, change: 3.10 },
];

const recentTransactions = [
  { date: '25/08/2025', type: 'Achat', ticker: 'CORIS', amount: 980000 },
  { date: '20/08/2025', type: 'Vente', ticker: 'TOTALCI', amount: -420000 },
  { date: '15/08/2025', type: 'Dépôt', description: 'Virement bancaire', amount: 1500000 },
];

// Sous-composant pour les cartes de statistiques
const StatCard = ({ title, value, change, changePercent, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex items-center text-gray-500 mb-2">
      {icon}
      <h4 className="text-sm font-semibold ml-2">{title}</h4>
    </div>
    <p className="text-3xl font-bold text-brand-blue">{value.toLocaleString('fr-FR')} FCFA</p>
    {change && (
      <div className={`flex items-center mt-1 text-sm font-semibold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1 transform -scale-y-100" />}
        <span>{change.toLocaleString('fr-FR')} FCFA ({changePercent}%)</span>
      </div>
    )}
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const { data: md, status: mdStatus } = useMarketStream({ symbols: ['BRVM10','SONATEL','BOAC','CORIS'] });
  const displayName = (() => {
    const name = user?.name || '';
    if (!name) return 'Utilisateur';
    const first = name.trim().split(/\s+/)[0];
    return first || name;
  })();

  return (
    <div className="bg-brand-cream min-h-full p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        {/* En-tête avec le nom de l'utilisateur et les actions rapides */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-brand-blue">Bienvenue, {displayName}</h1>
            <p className="text-gray-600">{user?.email ? user.email : 'Voici un aperçu de votre portefeuille.'}</p>
            <div className="mt-2">
              <NavLink
                to="/parametres"
                className="inline-block text-sm font-semibold text-brand-blue hover:underline"
              >
                Modifier mon profil
              </NavLink>
            </div>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              <PlusCircle size={20} className="mr-2" /> Acheter
            </button>
            <button className="flex items-center bg-brand-gold text-brand-blue font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
              <ArrowRightCircle size={20} className="mr-2" /> Déposer / Retirer
            </button>
          </div>
        </div>

        {/* Cartes de statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard 
            title="Valeur Totale du Portefeuille" 
            value={portfolioValue} 
            change={portfolioChange}
            changePercent={portfolioChangePercent}
            icon={<PieChart size={18} />}
          />
          <StatCard 
            title="Liquidités Disponibles" 
            value={278800} 
            icon={<Download size={18} />}
          />
        </div>

        {/* Ticker Marché (mock) */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-brand-blue">Marché (démonstration)</h2>
            <span className={`text-xs px-2 py-1 rounded ${md.realtime ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {md.realtime ? 'Temps réel' : 'Différé'} • {mdStatus}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['BRVM10','SONATEL','BOAC','CORIS'].map(sym => {
              const q = md.quotes[sym];
              const color = q && q.change >= 0 ? 'text-green-600' : 'text-red-600';
              return (
                <div key={sym} className="border rounded p-3">
                  <div className="text-xs text-gray-500">{sym}</div>
                  <div className="text-lg font-bold">{q ? q.price.toFixed(2) : '—'}</div>
                  <div className={`text-xs font-semibold ${color}`}>{q ? `${q.change.toFixed(2)} (${q.percent.toFixed(2)}%)` : '—'}</div>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-gray-500">Source: flux mock interne • Remplacé par BRVM/vendor après contrat.</p>
        </div>

        {/* Sections Portefeuille et Transactions Récentes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale : Détail du portefeuille */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-brand-blue mb-4">Mon Portefeuille</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="p-3 font-semibold">Actif</th>
                    <th className="p-3 font-semibold text-right">Quantité</th>
                    <th className="p-3 font-semibold text-right">Valeur</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map(stock => (
                    <tr key={stock.ticker} className="border-b border-gray-100">
                      <td className="p-3">
                        <NavLink to={`/action/${stock.ticker}`} className="font-bold text-brand-blue hover:underline">{stock.name}</NavLink>
                      </td>
                      <td className="p-3 font-mono text-right">{stock.quantity}</td>
                      <td className="p-3 font-mono text-right">{stock.value.toLocaleString('fr-FR')} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Colonne latérale : Transactions récentes */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-brand-blue mb-4">Transactions Récentes</h2>
            <ul className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold">{tx.type === 'Dépôt' ? tx.description : `${tx.type} ${tx.ticker}`}</p>
                    <p className="text-gray-500">{tx.date}</p>
                  </div>
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount.toLocaleString('fr-FR')} FCFA
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
