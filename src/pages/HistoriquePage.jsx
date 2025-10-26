import React from 'react';
import { Download, Filter } from 'lucide-react';

// Données factices plus complètes pour l'historique
const transactions = [
  { id: 'TXN123', date: '25/08/2025', type: 'Achat', description: '10 x CORIS @ 98 000', amount: -980000, status: 'Exécuté' },
  { id: 'TXN122', date: '20/08/2025', type: 'Vente', description: '20 x TOTALCI @ 21 000', amount: 420000, status: 'Exécuté' },
  { id: 'TXN121', date: '15/08/2025', type: 'Dépôt', description: 'Virement bancaire entrant', amount: 1500000, status: 'Confirmé' },
  { id: 'TXN120', date: '10/08/2025', type: 'Dividende', description: 'Dividende SONATEL', amount: 125000, status: 'Confirmé' },
  { id: 'TXN119', date: '05/08/2025', type: 'Retrait', description: 'Virement vers compte bancaire', amount: -500000, status: 'Confirmé' },
];

const HistoriquePage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-blue">Historique des Transactions</h1>
          <div className="flex space-x-2">
            <button className="flex items-center bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
              <Filter size={18} className="mr-2" /> Filtrer
            </button>
            <button className="flex items-center bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90">
              <Download size={18} className="mr-2" /> Exporter
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-gray-100">
                <tr>
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Type</th>
                  <th className="p-3 font-semibold">Description</th>
                  <th className="p-3 font-semibold text-right">Montant (FCFA)</th>
                  <th className="p-3 font-semibold text-center">Statut</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b border-gray-100">
                    <td className="p-3 text-sm text-gray-600">{tx.date}</td>
                    <td className="p-3 font-semibold">{tx.type}</td>
                    <td className="p-3">{tx.description}</td>
                    <td className={`p-3 font-mono text-right font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                      {tx.amount.toLocaleString('fr-FR')}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriquePage;
