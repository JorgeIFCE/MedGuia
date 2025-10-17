import React, { useState } from "react";
import "./App.css";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import DoctorPage from "./components/DoctorPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useAuth();

  if (user) {
    return <DoctorPage />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MedGuia</h1>
      </header>

      <main className="App-main">
        <p>O sistema que irá ajudar em suas consultas, otimizando seu tempo.</p>
        <div className="button-container">
          <button className="btn-register" onClick={() => setShowRegister(true)}>Cadastrar-se</button>
          <button className="btn-login" onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </main>

      <footer className="App-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#support">Support</a>
      </footer>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
