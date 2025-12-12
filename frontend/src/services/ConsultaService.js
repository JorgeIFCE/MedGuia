import axios from "axios";

const API_URL = "http://localhost:3001/consultas";

const ConsultaService = {
  registrarConsulta: async (consulta) => {
    const response = await axios.post(`${API_URL}/registrar`, consulta);
    return response.data;
  },

  listarConsultas: async () => {
    const response = await axios.get(`${API_URL}/listar`);
    return response.data;
  }
};

export default ConsultaService;
