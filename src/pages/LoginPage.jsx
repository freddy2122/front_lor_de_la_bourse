import React, { useState } from 'react'; // Correction 1: Importer useState
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import apiClient from '../api/apiClient'; // Assurez-vous que ce chemin est correct
import { Skeleton, SkeletonText } from '../components/common/Skeleton';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Ces états sont maintenant correctement initialisés grâce à l'import de useState
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Utilise la fonction login du contexte
      const user = await login({
        email: credentials.email,
        password: credentials.password,
      });

      console.log("Utilisateur connecté :", user);

      // Vérifier le rôle pour la redirection
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'client') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error("Erreur login :", err.response?.data || err.message);
      if (err.response && err.response.status === 401) {
        setError('Les identifiants fournis sont incorrects.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:px-6 sm:py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display text-brand-blue">Accéder à votre compte</h1>
        <p className="mt-2 text-gray-600">Heureux de vous revoir !</p>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] rounded-lg p-4">
            <div className="space-y-4">
              <SkeletonText lines={2} />
              <SkeletonText lines={2} />
              <div className="flex justify-end">
                <Skeleton className="h-12 w-40 rounded" />
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" aria-busy={isLoading}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Adresse email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={credentials.email} // Lier la valeur à l'état
              onChange={handleChange} 
              placeholder="vous@exemple.com" 
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                name="password"
                value={credentials.password} // Lier la valeur à l'état
                onChange={handleChange} 
                placeholder="••••••••" 
                required 
                className="w-full pr-11 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" 
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Affichage de l'erreur */}
          {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-brand-blue focus:ring-brand-gold border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-gray-900">Se souvenir de moi</label>
            </div>
            <NavLink to="/mot-de-passe-oublie" className="font-medium text-brand-blue hover:text-brand-gold">Mot de passe oublié ?</NavLink>
          </div>
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all disabled:bg-gray-400"
            >
              {isLoading ? 'Connexion en cours...' : (
                <>
                  <LogIn className="mr-2" size={20} />
                  <span>Connexion</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Pas encore de compte ?{' '}
        <NavLink to="/inscription" className="font-bold text-brand-blue hover:text-brand-gold">
          Inscrivez-vous ici
        </NavLink>
      </p>
    </div>
  );
};

export default LoginPage;
