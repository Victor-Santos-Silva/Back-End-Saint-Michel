require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");
const { Router } = require("express");
const router = Router();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/docs/swagger");
const app = express();

const routes = require("./router/router");

app.use(express.json());
app.use(cors());

// Servir arquivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("API Saint Michel está rodando!");
});

// Banco de dados e inicialização
sequelize
  .authenticate()
  .then(async () => {
    console.log("Conexão com o banco de dados bem-sucedida!");
    const PORT = process.env.PORT || 5100;
    app.listen(PORT, () => {
      console.log("---------------------------");
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log("---------------------------");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
