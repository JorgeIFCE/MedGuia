import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { nome, crm, email, senha, confirmarSenha } = req.body;

  if (!nome || !crm || !email || !senha || !confirmarSenha)
    return res.status(400).json({ message: "Preencha todos os campos" });

  if (senha !== confirmarSenha)
    return res.status(400).json({ message: "As senhas não coincidem" });

  const [existingCRM] = await db.query("SELECT * FROM users WHERE crm = ?", [crm]);
  if (existingCRM.length > 0)
    return res.status(400).json({ message: "CRM já cadastrado" });

  const [existingEmail] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (existingEmail.length > 0)
    return res.status(400).json({ message: "Email já cadastrado" });

  await db.query(
    "INSERT INTO users (nome, crm, email, senha) VALUES (?, ?, ?, ?)",
    [nome, crm, email, senha]
  );

  res.json({ nome, crm, email });
});

router.post("/login", async (req, res) => {
  const { crm, senha } = req.body;

  if (!crm || !senha)
    return res.status(400).json({ message: "Informe o CRM e a senha" });

  const [rows] = await db.query("SELECT * FROM users WHERE crm = ?", [crm]);
  if (rows.length === 0)
    return res.status(400).json({ message: "CRM não encontrado" });

  const user = rows[0];

  if (user.senha !== senha)
    return res.status(400).json({ message: "Senha incorreta" });

  res.json({ nome: user.nome, crm: user.crm, email: user.email });
});

export default router;
