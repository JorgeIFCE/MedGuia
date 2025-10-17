class PatientService {
  static async getPatientByCpf(cpf) {
    const response = await fetch(`http://localhost:3001/api/patients/${cpf}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Erro ao buscar paciente");
    return await response.json();
  }

  static async registerPatient(data) {
    const response = await fetch("http://localhost:3001/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao registrar paciente");
    return await response.json();
  }
}

export default PatientService;
