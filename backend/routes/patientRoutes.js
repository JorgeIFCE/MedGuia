import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/patients", async (req, res) => {
  const { cpf, nome, idade, numero, email } = req.body;

  if (!cpf || !nome || !idade)
    return res.status(400).json({ message: "CPF, nome e idade são obrigatórios" });

  const [existing] = await db.query("SELECT * FROM patients WHERE cpf = ?", [cpf]);
  if (existing.length > 0)
    return res.status(400).json({ message: "CPF já cadastrado" });

  await db.query(
    "INSERT INTO patients (cpf, nome, idade, numero, email) VALUES (?, ?, ?, ?, ?)",
    [cpf, nome, idade, numero, email]
  );

  res.json({ message: "Paciente cadastrado com sucesso!" });
});

router.get("/patients", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM patients");
  res.json(rows);
});

router.get("/patients/:cpf", async (req, res) => {
  const { cpf } = req.params;
  const [rows] = await db.query("SELECT * FROM patients WHERE cpf = ?", [cpf]);
  if (rows.length === 0) return res.status(404).json({ message: "Paciente não encontrado" });
  res.json(rows[0]);
});

export default router;
