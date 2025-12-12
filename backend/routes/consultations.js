import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      patient_cpf,
      nome,
      idade,
      numero,
      email,
      sintomas,
      medicamentos,
      dataConsulta
    } = req.body;

    const sql = `
      INSERT INTO consultations 
      (patient_cpf, nome, idade, numero, email, sintomas, medicamentos, dataConsulta)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      patient_cpf,
      nome,
      idade,
      numero,
      email,
      JSON.stringify(sintomas),
      JSON.stringify(medicamentos),
      dataConsulta
    ]);

    res.json({ success: true, message: "Consulta salva com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar consulta:", err);
    res.status(500).json({ success: false, error: "Erro ao salvar consulta" });
  }
});

app.post("/api/consultations", async (req, res) => {
  const { cpf, nome, idade, numero, email, dataConsulta, sintomas } = req.body;

  try {
    await db.query(
      "INSERT INTO consultations (cpf, nome, idade, numero, email, dataConsulta, sintomas) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [cpf, nome, idade, numero, email, dataConsulta, sintomas]
    );

    res.json({ message: "Consulta salva com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar consulta:", err);
    res.status(500).json({ message: "Erro ao salvar consulta." });
  }
});


export default router;
