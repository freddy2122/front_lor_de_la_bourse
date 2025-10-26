import React from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, TrendingUp, TrendingDown } from 'lucide-react';

// Données factices (les mêmes que le dashboard pour la cohérence)
const holdings = [
  { ticker: 'SONATEL', name: 'Sonatel', quantity: 100, purchasePrice: 16000, currentPrice: 17500, value: 1750000 },
  { ticker: 'BOAC', name: 'Bank of Africa - CI', quantity: 250, purchasePrice: 6800, currentPrice: 6500, value: 1625000 },
  { ticker: 'CORIS', name: 'Coris Bank Int.', quantity: 194, purchasePrice: 9000, currentPrice: 9800, value: 1901200 },
];

const PortefeuillePage = () => {
  const totalValue = holdings.reduce((acc, stock) => acc + stock.value, 0);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold font-display text-brand-blue mb-8">Mon Portefeuille</h1>

        {/* Section de synthèse et graphique */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
            <h2 className="text-xl font-bold text-brand-blue mb-4">Répartition des Actifs</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">[Emplacement pour le graphique Camembert (Pie Chart)]</p>
              {/* Vous intégrerez ici une librairie comme Chart.js ou Recharts */}
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-brand-blue mb-4">Performance Globale</h2>
            <p className="text-4xl font-bold text-brand-blue mb-2">{totalValue.toLocaleString('fr-FR')} FCFA</p>
            <p className="text-gray-600">Valeur totale actuelle</p>
            <div className="h-64 mt-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Emplacement pour le graphique de l'évolution du portefeuille]</p>
            </div>
          </div>
        </div>

        {/* Tableau détaillé des positions */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-brand-blue mb-4">Détail des Positions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-gray-100">
                <tr>
                  <th className="p-3 font-semibold">Actif</th>
                  <th className="p-3 font-semibold text-right">Quantité</th>
                  <th className="p-3 font-semibold text-right">Prix d'Achat Moyen</th>
                  <th className="p-3 font-semibold text-right">Cours Actuel</th>
                  <th className="p-3 font-semibold text-right">Valeur Totale</th>
                  <th className="p-3 font-semibold text-right">Plus/Moins-value</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map(stock => {
                  const gainLoss = (stock.currentPrice - stock.purchasePrice) * stock.quantity;
                  const isGain = gainLoss >= 0;
                  return (
                    <tr key={stock.ticker} className="border-b border-gray-100">
                      <td className="p-3">
                        <NavLink to={`/action/${stock.ticker}`} className="font-bold text-brand-blue hover:underline">{stock.name}</NavLink>
                      </td>
                      <td className="p-3 font-mono text-right">{stock.quantity}</td>
                      <td className="p-3 font-mono text-right">{stock.purchasePrice.toLocaleString('fr-FR')}</td>
                      <td className="p-3 font-mono text-right">{stock.currentPrice.toLocaleString('fr-FR')}</td>
                      <td className="p-3 font-mono text-right font-bold">{stock.value.toLocaleString('fr-FR')}</td>
                      <td className={`p-3 font-mono text-right font-semibold ${isGain ? 'text-green-600' : 'text-red-600'}`}>
                        {gainLoss.toLocaleString('fr-FR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortefeuillePage;
