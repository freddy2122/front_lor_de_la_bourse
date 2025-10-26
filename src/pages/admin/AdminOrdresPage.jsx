import React from 'react';
import { Clock } from 'lucide-react';

// Données factices pour les ordres
const orders = [
  { id: 'ORD501', client: 'Alice B.', type: 'Achat', ticker: 'SONATEL', quantity: 25, limitPrice: 17550, status: 'En attente' },
  { id: 'ORD502', client: 'Bob C.', type: 'Vente', ticker: 'BOAC', quantity: 100, limitPrice: null, status: 'En attente' },
  { id: 'ORD500', client: 'Charlie D.', type: 'Achat', ticker: 'CORIS', quantity: 50, limitPrice: 9800, status: 'Exécuté' },
];

const AdminOrdresPage = () => {
  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Clock size={32} className="text-red-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Ordres</h1>
      </div>
      <p className="text-gray-600 mb-6">Visualisez et traitez les ordres de bourse passés par les clients.</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-100">
            <tr>
              <th className="p-3 font-semibold">ID Ordre</th>
              <th className="p-3 font-semibold">Client</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Actif</th>
              <th className="p-3 font-semibold text-right">Quantité</th>
              <th className="p-3 font-semibold text-right">Prix Limite</th>
              <th className="p-3 font-semibold text-center">Statut</th>
              <th className="p-3 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-mono text-sm">{order.id}</td>
                <td className="p-3 font-semibold">{order.client}</td>
                <td className={`p-3 font-bold ${order.type === 'Achat' ? 'text-green-600' : 'text-red-600'}`}>{order.type}</td>
                <td className="p-3 font-semibold">{order.ticker}</td>
                <td className="p-3 font-mono text-right">{order.quantity}</td>
                <td className="p-3 font-mono text-right">{order.limitPrice ? order.limitPrice.toLocaleString('fr-FR') : 'Au marché'}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Exécuté' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {order.status === 'En attente' && <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Traiter</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdresPage;
