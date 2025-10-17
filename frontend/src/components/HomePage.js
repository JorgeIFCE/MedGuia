import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "../App.css";

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MedGuia</h1>
      </header>

      <main className="App-main">
        <p>O sistema que irá ajudar em suas consultas, otimizando seu tempo.</p>
        <div className="button-container">
          <button className="btn-register" onClick={() => setShowRegister(true)}>
            Cadastrar-se
          </button>
          <button className="btn-login" onClick={() => setShowLogin(true)}>
            Login
          </button>
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

export default HomePage;
