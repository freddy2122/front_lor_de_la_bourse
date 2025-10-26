import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient"; // ✅ on utilise notre instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifie si un token existe déjà
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setAuthToken(token);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // 🔑 Login
  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { token, refresh_token, user } = response.data;

      // Sauvegarde
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("auth_token", token);
      if (refresh_token) {
        localStorage.setItem("refresh_token", refresh_token);
      }
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 🔁 Met à jour l'utilisateur en mémoire et dans le localStorage
  const updateUser = (partialUser) => {
    setUser((prev) => {
      const nextUser = { ...(prev || {}), ...(partialUser || {}) };
      localStorage.setItem("user", JSON.stringify(nextUser));
      return nextUser;
    });
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setAuthToken(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, authToken, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
