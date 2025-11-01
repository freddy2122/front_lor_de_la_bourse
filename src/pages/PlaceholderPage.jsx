import React from 'react';

function PlaceholderPage({ title = 'Page' }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-blue">{title}</h1>
      <p className="mt-4 text-gray-700">Contenu à venir.</p>
    </div>
  );
}

export default PlaceholderPage;
