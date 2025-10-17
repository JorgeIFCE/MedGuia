import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import './LoginModal.css';

function RegisterModal({ onClose, onRegisterSuccess, authService = AuthService }) {
  const [nome, setNome] = useState('');
  const [crm, setCrm] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = await authService.register(nome, crm, email, senha, confirmarSenha);
      alert("Cadastro realizado com sucesso!");
      if (onRegisterSuccess) onRegisterSuccess(newUser);
      onClose();
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Crie sua conta de médico</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <form className="form-login" onSubmit={handleRegister}>
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

          <label>CRM</label>
          <input type="text" value={crm} onChange={(e) => setCrm(e.target.value)} />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

          <label>Confirme sua senha</label>
          <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />

          <div className="form-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-login-submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
