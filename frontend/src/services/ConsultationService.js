const API_BASE = "http://localhost:3001/api";

const ConsultationService = {
  saveConsultation: async (payload) => {
    const resp = await fetch(`${API_BASE}/consultations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.message || "Erro ao salvar consulta.");
    }
    return data;
  },

  getAllConsultations: async () => {
    const resp = await fetch(`${API_BASE}/consultations`);

    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.message || "Erro ao carregar consultas.");
    }
    return data;
  },

  getConsultationsByCpf: async (cpf) => {
    const resp = await fetch(`${API_BASE}/consultations/${cpf}`);

    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.message || "Erro ao buscar consultas do paciente.");
    }
    return data;
  }
};

export default ConsultationService;
