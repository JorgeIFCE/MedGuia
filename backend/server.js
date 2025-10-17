import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", patientRoutes);
app.use("/api", consultationRoutes);

app.listen(3001, () => console.log("✅ Servidor backend rodando em http://localhost:3001"));
