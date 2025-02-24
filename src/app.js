require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const routes = require("./router/router");
const loginRoutes = require("./router/loginRotas");
const admRoutes = require("./router/admRotas"); // ✅ Importando a rota de admin
const Adm = require("./models/adm"); // ✅ Importando o modelo do admin
const bcrypt = require("bcrypt"); // ✅ Corrigido para bcryptjs

const app = express(); // Iniciando servidor

// ✅ Middlewares
app.use(cors()); // Permitir requisições de outros domínios
app.use(express.json()); // Permitir JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permitir formulários no corpo das requisições

// ✅ Rotas
app.use("/api/auth", loginRoutes);
app.use("/api", routes);
app.use("/api/admin", admRoutes); // ✅ Adicionando rota para login de admin

// 🔹 Criar usuário admin se não existir
async function criarAdmin() {
    try {
        const adminExistente = await Adm.findOne({ where: { email: emailAdmin } });

        if (!adminExistente) {
            const senhaCriptografada = await bcrypt.hash(senhaAdmin, 10);
            await Adm.create({ email: emailAdmin, senha: senhaCriptografada, isAdmin: true });
            console.log("✅ Usuário admin criado!");
        } else {
            console.log("⚠️ Usuário admin já existe.");
        }
    } catch (error) {
        ''
        console.error("Erro ao criar admin:", error);
    }
}

// ✅ Testando conexão com o banco de dados e criando admin
sequelize
    .authenticate()
    .then(async () => {
        console.log("📌 Conexão com o banco de dados bem-sucedida!");
        await criarAdmin(); // Criar admin ao iniciar o servidor
        app.listen(process.env.PORT || 5000, () => {
            console.log("---------------------------");
            console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT || 5000}`);
            console.log("---------------------------");
        });
    })
    .catch((err) => {
        console.error("❌ Erro ao conectar ao banco de dados:", err);
    });
