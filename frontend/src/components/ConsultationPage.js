import React, { useState, useEffect } from "react";
import PatientService from "../services/PatientService";
import "./ConsultationPage.css";
import PrescriptionModal from "./PrescriptionModal";
import ConsultationService from "../services/ConsultationService";

function ConsultationPage({ onBack }) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");

const categorias = [
  {
    nome: "Sintomas Gerais",
    itens: ["Febre", "Fadiga", "Perda de peso", "Sudorese", "Prurido", "Calafrios", "Astenia", "Adnamia", "Icterícia", "Palidez", "Fraqueza", "Anorexia"],
  },
  {
    nome: "Pele e Anexos",
    itens: ["Prurido", "Fotossensibilidade", "Rash", "Alterações de pigmentação", "Alterações do revestimento cutâneo", "Lesões primarias", "Alopécia", "Hipertricose", "Alteração ungueal"],
  },
  {
    nome: "Cabeça e Pescoço",
    itens: ["Dor", "Cefaleia", "Alteração dos movimentos", "Nodulações", "Adenomegalias", "Disfonia"],
  },
  {
    nome: "Aparelho Ocular",
    itens: ["Dor ocular", "Fotofobia", "Diplopia", "Xeroftalmia", "Sensação de corpo estranho", "Lacrimejamento", "Nistagmo"],
  },
  {
    nome: "Aparelho Auditivo",
    itens: ["Trauma", "Lesões da pele", "Otalgia", "Otorreia", "Otorragia", "Zumbido", "Acúfenos", "Hipoacusia"],
  },
  {
    nome: "Nariz e Cavidades Paranasais",
    itens: ["Alterações da olfação", "Rinorreia", "Obstrução nasal", "Crise esternutatórias", "Epistaxe"],
  },
  {
    nome: "Cavidade Bucal e Anexos",
    itens: ["Lesões de mucosa oral", "Halitose", "Disfagia", "Disfonia", "Odinofagia", "Xerostomia", "Rouquidão", "Diseugias", "Sialose"],
  },
  {
    nome: "Aparelho Respiratório",
    itens: ["Dor Ventilatorio Dependente", "Dispneia", "Ortopneia", "Trepopneia", "Platipneia", "Dispneia Paroxistica Noturna", "Tosse", "Expectoração", "Vômica", "Hemoptise", "Alteração Do Forma Do Torax", "Sibilância", "Estertores Subcrepitantes", "Egofonia e/o Pectoriloquia"],
  },
  {
    nome: "Aparelho Cardiovascular",
    itens: ["Dor Precordial", "Palpitações", "Dispneia", "Dispneia Paroxistica Noturna", "Ortopneia", "Edema", "Cianose", "Palidez", "Sudorese", "Hemoptoicos", "Cardiomegalia", "Edema Agudo de Pulmão", "Derrame Pleural"],
  },
  {
    nome: "Aparelho Digestivo",
    itens: ["Alterações de Forma do Abdome ou do Apetite", "Dor", "Sialorreia", "Halitose", "Disfagia", "Odinofagia", "Pirose", "Regurgitação", "Náuseas", "Vômitos", "Icterícia", "Intolerância Alimentar", "Hematêmese", "Hematoquezia", "Plenitude Gástrica", "Empachamento Pós-prandial", "Diarreia", "Disenteria", "Esteatorreia", "Constipação", "Flatulência", "Tenesmo", "Dor anal", "Disquezia"],
  },
  {
    nome: "Aparelho Genito-urinário",
    itens: ["Alterações Miccionais", "Alterações do Volume", "Alterações do Ritmo", "Alterações de Cor", "Alterações no cheiro", "Edema", "Dor Lombar"],
  },
  {
    nome: "Sistema Nervoso",
    itens: ["Distúrbios da Motricidade e da Sensibilidade", "Alterações do Olfato", "Audição", "Visão", "Equilíbrio", "Nível de Consciência", "Disfunções Esfincterianas", "Alterações de Sono-vigilia", "Funções Corticais Superiores"],
  },
  {
    nome: "Sistema Músculo-esquelético",
    itens: ["Dor", "Rigidez Pós-repouso", "Sinais Inflamatórios", "Crepitação Articular", "Deformidades", "Restrição de Mobilidade", "Tofos", "Nódulos", "Alterações da Força e do Tônus Muscular", "Atrofia Muscular", "Hipertrofias", "Miotonias", "Tetania", "Cãibras"],
  },
  {
    nome: "Sistema Psiquiátrico",
    itens: ["Insónia", "Nervosismo", "Depressão", "Alterações de humor", "Histórico de Trastorno Mental", "Sofrimento Psíquico", "TAG"],
  },
];

const [selectedSymptoms, setSelectedSymptoms] = useState([]);

const toggleSymptom = (symptom) => {
  setSelectedSymptoms((prev) =>
    prev.includes(symptom)
      ? prev.filter((s) => s !== symptom)
      : [...prev, symptom]
  );
};

const [showRecipeModal, setShowRecipeModal] = useState(false);


  useEffect(() => {
    const hoje = new Date().toLocaleDateString("pt-BR");
    setDataConsulta(hoje);
  }, []);

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

  const [qtdMedicamentos, setQtdMedicamentos] = useState("");

  const handleFinishConsultation = async () => {
  if (!cpf || !nome || !idade) {
    alert("Preencha os dados do paciente antes de finalizar.");
    return;
  }

  if (!qtdMedicamentos || Number(qtdMedicamentos) < 0) {
    alert("Informe a quantidade de medicamentos.");
    return;
  }

  try {
    await ConsultationService.saveConsultation({
      patient_cpf: cpf,
      nome,
      idade,
      numero,
      email,
      medicacao: qtdMedicamentos,
    });

    alert("Consulta finalizada com sucesso!");
    onBack();
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar consulta.");
  }
};


  return (
    <div className="consultation-container">
      <header className="consultation-header">
        <h1>MedGuia</h1>
        <button className="btn-back" onClick={onBack}>Voltar</button>
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
            <input type="text" value={dataConsulta} disabled className="data-field" />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Nome do paciente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="number"
              placeholder="Idade"
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
              placeholder="Email do paciente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </section>
        <section className="symptom-section">
  <h2>Selecione os sintomas</h2>
  <p>Selecione os sintomas percebidos durante a anamnese</p>

  {categorias.map((categoria, index) => (
    <div key={index} className="categoria-container">
      <h3 className="categoria-titulo">{categoria.nome}</h3>

      <div className="symptom-row">
        {categoria.itens.map((item, i) => (
          <div
            key={i}
            className={`symptom-card-2 ${
              selectedSymptoms.includes(item) ? "selected" : ""
            }`}
            onClick={() => toggleSymptom(item)}
          >
            <div className="symptom-icon-2" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  ))}
<div className="medicamentos-container">
  <h2>Quantos medicamentos serão receitados?</h2>

  <input
    type="number"
    min="1"
    placeholder="Digite a quantidade"
    className="medicamentos-input"
    value={qtdMedicamentos}
    onChange={(e) => setQtdMedicamentos(e.target.value)}
  />
</div>

  <button
  className="btn-create"
  onClick={() => setShowRecipeModal(true)}
>
  Criar receita
</button>

<button className="btn-finish" onClick={handleFinishConsultation}>
  Finalizar consulta
</button>



{showRecipeModal && (
  <PrescriptionModal
    qtdMedicamentos={qtdMedicamentos}
    onClose={() => setShowRecipeModal(false)}
  />
)}

</section>

      </main>

      <footer className="consultation-footer">
        <p>© 2025 MedGuia — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default ConsultationPage;
