import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout();
      } finally {
        navigate('/login', { replace: true });
      }
    };
    doLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <p className="text-lg font-semibold text-brand-blue">Déconnexion en cours...</p>
    </div>
  );
};

export default Logout;
