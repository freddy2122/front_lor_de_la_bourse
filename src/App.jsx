import React from 'react';

// 1. Importation du fournisseur de contexte d'authentification
// Ce composant rendra les informations de l'utilisateur (connecté ou non)
// accessibles à toute l'application.
import { AuthProvider } from './contexts/AuthContext';

// 2. Importation du routeur principal de l'application
// Ce composant contient la logique de toutes les URL (pages) de votre site.
import AppRouter from './routes/AppRouter';

/**
 * Le composant App est le composant racine de toute l'application.
 * Son rôle est d'initialiser les fournisseurs de contexte globaux (comme AuthProvider)
 * et de rendre le système de routage principal.
 */
function App() {
  return (
    // AuthProvider enveloppe AppRouter.
    // Cela signifie que toutes les routes et pages définies dans AppRouter
    // auront accès au contexte d'authentification (pour savoir si l'utilisateur
    // est connecté, qui il est, etc.).
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
