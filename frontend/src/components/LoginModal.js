import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

function LoginModal({ onClose }) {
  const [crm, setCrm] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(crm, senha);
      onClose();
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Acesso Médico - Login</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <form className="form-login" onSubmit={handleLogin}>
          <label>CRM</label>
          <input type="text" value={crm} onChange={(e) => setCrm(e.target.value)} />

          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

          <div className="form-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-login-submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
