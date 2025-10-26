import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ role }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <p className="text-lg font-semibold text-brand-blue">
          Vérification de la session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Vérifier le rôle si spécifié
  if (role && user?.role !== role) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default PrivateRoute;
