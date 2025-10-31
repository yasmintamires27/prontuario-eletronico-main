import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());




function lerBanco() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

function salvarBanco(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}


app.post("/api/prontuarios", (req, res) => {
  try {
    const db = lerBanco();
    const prontuario = req.body;

    db.prontuarios.push(prontuario);
    salvarBanco(db);

    // feedback pro backend
    console.log("✅ Novo prontuário salvo:", prontuario);
    // feedback para o usuário 
    res.status(201).json({ message: "Prontuário salvo com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao salvar prontuário:", error);
    res.status(500).json({ error: "Falha ao salvar prontuário." });
  }
});


app.get("/api/prontuarios", (req, res) => {
  try {
    const db = lerBanco();
    res.json(db.prontuarios);
  } catch (error) {
    console.error("❌ Erro ao listar prontuários:", error);
    res.status(500).json({ error: "Falha ao listar prontuários." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log("💾 Banco de dados local: db.json");
});
