import React, { useState } from "react";
import PatientService from "../services/PatientService";
import "./ConsultationPage.css";

function ConsultationPage({ onBack }) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  const handleSearch = async () => {
    setErro("");
    try {
      const patient = await PatientService.getPatientByCpf(cpf);
      if (!patient) {
        setErro("Paciente não encontrado. Cadastre-o primeiro.");
        setNome("");
        setIdade("");
        setNumero("");
        setEmail("");
        return;
      }
      setNome(patient.nome);
      setIdade(patient.idade);
      setNumero(patient.numero);
      setEmail(patient.email);
    } catch {
      setErro("Erro ao buscar paciente.");
    }
  };

  const handleRegister = async () => {
    setErro("");
    if (!cpf || !nome || !idade) {
      setErro("Preencha CPF, nome e idade para registrar o paciente.");
      return;
    }
    try {
      await PatientService.registerPatient({ cpf, nome, idade, numero, email });
      alert("Paciente registrado com sucesso!");
    } catch {
      setErro("Erro ao registrar paciente.");
    }
  };

  return (
    <div className="consultation-container">
      <header className="consultation-header">
        <h1>MedGuia</h1>
      </header>

      <main className="consultation-main">
        <section className="patient-data">
          <h2>Dados da consulta</h2>
          <p>Preencha os campos com os dados do paciente</p>

          {erro && <p className="error-message">{erro}</p>}

          <div className="form-row">
            <input
              type="text"
              placeholder="Digite o CPF do paciente"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar paciente</button>
            <button onClick={handleRegister}>Registrar paciente</button>
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Digite o nome do paciente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="number"
              placeholder="Digite a idade do paciente"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="(85) 99999-9999"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <input
              type="email"
              placeholder="Digite o email do paciente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </section>

        <section className="symptom-section">
          <h2>Selecione os sintomas</h2>
          <p>Selecione os sintomas percebidos durante a anamnese do paciente</p>

          <button className="btn-suggestion">Gerar Sugestão</button>

          <div className="symptom-grid">
            <div className="symptom-card">Sintoma 1<br />Descrição do sintoma</div>
            <div className="symptom-card">Sintoma 2<br />Descrição do sintoma</div>
            <div className="symptom-card">Sintoma 3<br />Descrição do sintoma</div>
            <div className="symptom-card">Sintoma 4<br />Descrição do sintoma</div>
          </div>

          <button className="btn-create">Criar receita</button>
        </section>
      </main>

      <footer className="consultation-footer">
        <p>© 2025 MedGuia — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default ConsultationPage;
