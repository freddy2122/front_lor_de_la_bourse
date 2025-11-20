import React from 'react';
import { NavLink } from 'react-router-dom';

const ROWS = [
  {
    name: 'Académie BRVM (exemple)',
    country: 'Côte d\'Ivoire',
    type: 'Formations en ligne et ateliers',
  },
  {
    name: 'Centre Financier Dakar (exemple)',
    country: 'Sénégal',
    type: 'Séminaires présentiels',
  },
  {
    name: 'Club Bourse Abidjan (exemple)',
    country: 'Côte d\'Ivoire',
    type: 'Sessions de sensibilisation et simulations',
  },
];

const ApprendreListeFormateursPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Apprendre</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Liste des formateurs en bourse</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Formateurs en bourse (exemples)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Il est souvent utile de se former auprès de professionnels avant d&apos;investir des montants
          importants. Voici quelques exemples fictifs de structures qui pourraient proposer des
          formations boursières dans l&apos;espace UEMOA.
        </p>

        <div className="bg-white border border-gray-100 rounded-lg overflow-x-auto text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Pays</th>
                <th className="px-4 py-2 text-left">Type de formation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-2 text-gray-800">{row.name}</td>
                  <td className="px-4 py-2 text-gray-700">{row.country}</td>
                  <td className="px-4 py-2 text-gray-700">{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Pour choisir une formation réelle, il est important de vérifier les références du
          formateur, le contenu détaillé du programme et les avis d&apos;anciens participants.
        </p>
      </div>
    </div>
  );
};

export default ApprendreListeFormateursPage;
