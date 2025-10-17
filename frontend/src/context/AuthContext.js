import React, { createContext, useState, useContext } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children, authService = AuthService }) {
  const [user, setUser] = useState(authService.getUser());

  const login = async (crm, senha) => {
    const loggedUser = await authService.login(crm, senha);
    setUser(loggedUser);
  };

  const register = async (nome, crm, email, senha, confirmarSenha) => {
    const newUser = await authService.register(nome, crm, email, senha, confirmarSenha);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
