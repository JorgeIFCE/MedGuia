import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/consultations", async (req, res) => {
  const { patient_cpf, nome, idade, numero, email, medicacao } = req.body;

  if (!patient_cpf || !nome || !idade)
    return res.status(400).json({ message: "CPF, nome e idade são obrigatórios" });

  if (isNaN(medicacao) || medicacao < 0)
    return res.status(400).json({ message: "Quantidade de medicamentos inválida." });

  try {
    await db.query(
      `INSERT INTO consultations 
        (patient_cpf, nome, idade, numero, email, medicacao)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patient_cpf, nome, idade, numero, email, medicacao]
    );

    res.status(201).json({ message: "Consulta registrada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar consulta." });
  }
});

router.get("/consultations", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM consultations ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar consultas." });
  }
});

router.get("/consultations/:cpf", async (req, res) => {
  const { cpf } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM consultations WHERE patient_cpf = ? ORDER BY id DESC",
      [cpf]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar consultas do paciente." });
  }
});

export default router;
