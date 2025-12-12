import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ConsultationService from "../services/ConsultationService";
import ConsultationPage from "./ConsultationPage";
import "./DoctorPage.css";

function DoctorPage() {
  const { user, logout } = useAuth();   // ⬅️ importa o logout
  const [consultations, setConsultations] = useState([]);
  const [inConsultation, setInConsultation] = useState(false);

  useEffect(() => {
    async function fetchConsultations() {
      try {
        const data = await ConsultationService.getAllConsultations();
        setConsultations(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchConsultations();
  }, []);

  if (inConsultation) {
    return <ConsultationPage onBack={() => setInConsultation(false)} />;
  }

  return (
    <div className="doctor-page-container">
      <header className="doctor-page-header">
        <h1>MedGuia</h1>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </header>

      <section className="doctor-page-welcome">
        <h2>Bem-vindo, Dr. {user?.nome}!</h2>
        <button className="btn-start" onClick={() => setInConsultation(true)}>
          Iniciar Consulta
        </button>
      </section>

      <section className="doctor-page-consultations">
        <h3>Consultas</h3>

        <div className="consultation-list">
          {consultations.length === 0 ? (
            <p>Nenhuma consulta registrada.</p>
          ) : (
            consultations.map((c, index) => (
              <div key={index} className="consultation-card">
                <div>
                  <strong>Paciente:</strong> {c.nome} <br />
                  <strong>CPF:</strong> {c.patient_cpf || c.cpf} <br />
                  <strong>Idade:</strong> {c.idade} <br />
                  <strong>Contato:</strong> {c.numero} <br />
                  <strong>Email:</strong> {c.email}
                </div>
                <div>
                  <strong>Medicação:</strong> {c.medicacao}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default DoctorPage;
