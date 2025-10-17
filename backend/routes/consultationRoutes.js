import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/consultations", async (req, res) => {
  const { patient_cpf, nome, idade, numero, email, medicacao } = req.body;

  if (!patient_cpf || !nome || !idade)
    return res.status(400).json({ message: "CPF, nome e idade são obrigatórios" });

  const [patient] = await db.query("SELECT * FROM patients WHERE cpf = ?", [patient_cpf]);
  if (patient.length === 0)
    return res.status(404).json({ message: "Paciente não encontrado" });

  await db.query(
    "INSERT INTO consultations (patient_cpf, nome, idade, numero, email, medicacao) VALUES (?, ?, ?, ?, ?, ?)",
    [patient_cpf, nome, idade, numero, email, medicacao]
  );

  res.json({ message: "Consulta registrada com sucesso!" });
});

router.get("/consultations", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM consultations");
  res.json(rows);
});

router.get("/consultations/:cpf", async (req, res) => {
  const { cpf } = req.params;
  const [rows] = await db.query("SELECT * FROM consultations WHERE patient_cpf = ?", [cpf]);
  res.json(rows);
});

export default router;
