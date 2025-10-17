class ConsultationService {
  static async getAllConsultations() {
    const response = await fetch("http://localhost:3001/api/consultations");
    if (!response.ok) throw new Error("Erro ao buscar consultas");
    return await response.json();
  }

  static async getByPatientCpf(cpf) {
    const response = await fetch(`http://localhost:3001/api/consultations/${cpf}`);
    if (!response.ok) throw new Error("Erro ao buscar consultas do paciente");
    return await response.json();
  }
}

export default ConsultationService;
