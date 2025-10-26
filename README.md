# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Configuration (.env) et Démarrage

## Prérequis
- Node.js 18+ recommandé
- npm (ou pnpm/yarn)

## Variables d’environnement (Vite)
Vite n’expose que les variables préfixées par `VITE_` au front. Nous utilisons:
- `VITE_API_BASE_URL`: URL de base de l’API, par exemple `http://localhost:8001/api`

Fichiers fournis:
- `.env.example` (modèle à copier)
- `.env.development` (valeurs pour le développement)
- `.env.production` (valeurs pour la production)

Copiez puis adaptez:

```bash
cp .env.example .env.development
# Éditez .env.development pour y mettre votre URL d’API
```

Exemple:

```env
VITE_API_BASE_URL="http://localhost:8001/api"
```

## Installation & scripts

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

# Architecture de l’application

## Pile technique
- React 19 + Vite 7
- Tailwind CSS (config: `tailwind.config.js`)
- React Router DOM (routing, layouts, routes protégées)
- Axios (client HTTP, `src/api/apiClient.js`)

## Arborescence (extraits clés)
- `src/App.jsx`: point d’entrée applicatif côté React, enveloppé par `AuthProvider`
- `src/main.jsx`: bootstrap Vite/React
- `src/routes/AppRouter.jsx`: déclaration de l’ensemble des routes (publiques, auth, client, admin)
- `src/routes/PrivateRoute.jsx`: protection des routes par rôle (`client` | `admin`)
- `src/routes/navigation.js`: utilitaire de navigation globale pour rediriger hors composants
- `src/contexts/AuthContext.jsx`: gestion de l’authentification, `login`, `logout`, persistance token/user
- `src/api/apiClient.js`: instance Axios (baseURL via `VITE_API_BASE_URL`, interceptors, redirection 401)
- `src/components/layout/`: `MainLayout`, `AuthLayout`, `Navbar`, `Footer`, `MarketTicker`
- `src/components/dashboard_layout/`: Layouts Client et Admin avec sidebars responsives
- `src/pages/`: pages publiques et privées (client + admin)

## Authentification
- `AuthProvider` expose: `isAuthenticated`, `user`, `authToken`, `isLoading`, `login()`, `logout()`
- Persistance dans `localStorage` (`auth_token`, `user`)
- Intercepteur Axios: retire le token et redirige vers `/login` en cas de 401

## Routes & layouts
- Public (`/`): `MainLayout` englobe `Navbar`, `MarketTicker`, `Footer` et injecte les pages via `<Outlet />`
- Auth (`/login`, `/inscription`): `AuthLayout` (colonne branding + zone formulaire via `<Outlet />`)
- Espace Client (protégé): `PrivateRoute role="client"` + `ClientDashboardLayout`
- Espace Admin (protégé): `PrivateRoute role="admin"` + `AdminDashboardLayout`
- Déconnexion: `/logout` (appelle `logout()` puis redirige)

## Client API (Axios)
- BaseURL configurable via `.env.*` (`VITE_API_BASE_URL`)
- Intercepteur requête: ajoute le header `Authorization: Bearer <token>` si présent
- Intercepteur réponse: gère 401/403; 401 nettoie le storage et redirige vers `/login`

# Bonnes pratiques & conseils
- Centraliser les appels API via `apiClient`
- Ajouter des toasts pour les erreurs réseau (améliore l’UX)
- Utiliser des composants réutilisables (cartes, sections) pour la cohérence UI

## Dépannage (Troubleshooting)

- **Variables d’environnement non prises en compte**
  - Redémarrer le serveur Vite après modification des `.env`.
  - Vérifier que les clés sont bien préfixées par `VITE_` (ex: `VITE_API_BASE_URL`).
  - Vérifier l’environnement courant (dev/prod) et les fichiers `.env.*` utilisés.

- **Erreurs 401 (non authentifié)**
  - Le token peut être expiré ou absent; l’intercepteur nettoie le storage et redirige vers `/login`.
  - Vérifier que l’API attend bien `Authorization: Bearer <token>`.
  - Confirmer que `localStorage` contient `auth_token` et `user` après `login()`.

- **Erreurs CORS**
  - Configurer le serveur API pour autoriser l’origine du front (en dev: `http://localhost:5173`).
  - Vérifier les headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`.
  - En dev, éviter les credentials si non nécessaires (ou configurer `Access-Control-Allow-Credentials`).

- **Navigation ne redirige pas depuis l’API**
  - Vérifier que `NavigatorBridge` est monté (voir `src/routes/AppRouter.jsx`).
  - S’assurer que `setNavigator(navigate)` est bien appelé (pas d’erreurs console liées à l’import).

- **404 internes**
  - Confirmer l’existence de toutes les pages référencées dans `AppRouter.jsx`.
  - Vérifier les chemins d’import (alias `@` → `src/` est configuré dans `vite.config.js`).

- **Auto-refresh du token (optionnel)**
  - Si l’API fournit un `refresh_token`, implémentez un intercepteur qui, sur 401:
    1. Tente d’appeler `/auth/refresh` avec le `refresh_token`.
    2. Si succès, met à jour le `auth_token` dans `localStorage`, rejoue la requête initiale.
    3. Si échec, redirige vers `/login` (comportement actuel).
  - Veiller à: mutex/queue pour éviter les refresh simultanés, et à ne pas créer de boucle infinie.
  - Exemple de pattern: maintenir un `isRefreshing` et une file d’attente de callbacks.

## Checklist de déploiement

- **Variables d’environnement**
  - Définir `VITE_API_BASE_URL` pour l’environnement de production.
  - Ne pas exposer de secrets (seules les clés `VITE_` sont chargées côté front).

- **Build**
  - `npm run build` pour générer la version de production.
  - `npm run preview` pour vérifier le build localement.

- **Serveur/API**
  - Autoriser l’origine du front (CORS) et vérifier HTTPS si nécessaire.
  - S’assurer que les endpoints `/auth/login`, `/auth/logout`, etc., répondent correctement.

- **Vérifications post-déploiement**
  - Connexion/déconnexion (redirige correctement, storage nettoyé).
  - Accès aux routes protégées selon le rôle (`client`/`admin`).
  - Assets (vidéo, images) chargés correctement via Vite.

## Checklist QA locale (rapide)

- **Parcours public**
  - Accueil (`/`): Navbar, MarketTicker, sections d’accueil, Footer.
  - Liens principaux: Services, Marché, Analyses, Tarifs, Apprendre, À propos, Contact.

- **Auth**
  - Login avec crédentials valides: redirection selon rôle (`client` → `/dashboard`, `admin` → `/admin/dashboard`).
  - Login invalide: message d’erreur affiché.
  - Déconnexion: `/logout` nettoie le storage et redirige vers `/login`.

- **Espace client**
  - Accès `/dashboard`, `/portefeuille`, `/historique`, `/parametres` si rôle `client`.
  - Accès interdit si non authentifié (redirigé vers `/login`).

- **Espace admin**
  - Accès `/admin/*` si rôle `admin`.
  - Rôle incorrect: redirection vers `/unauthorized`.

- **Réseau/API**
  - 401 renvoie à `/login` et supprime le token.
  - Vérifier `VITE_API_BASE_URL` (dev/prod) et CORS côté API.
