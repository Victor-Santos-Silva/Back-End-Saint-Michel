const adm = require("../models/adm");
const bcrypt = require("bcrypt");

const admService = {
    autenticar: async (email, senha) => {
        try {

            console.log(`🔍 Tentativa de login com email: ${email}`);

            const admin = await adm.findOne({ where: { email } });

            if (!admin) {
                console.log("❌ Admin não encontrado.");
                return null;
            }

            if (!admin.isAdmin) {
                console.log("❌ Acesso negado! Apenas administradores podem entrar.");
                return null;
            }

            const senhaCorreta = await bcrypt.compare(senha, admin.senha);
            if (!senhaCorreta) {
                console.log("❌ Senha incorreta.");
                return null;
            }

            return admin;
        } catch (error) {
            console.error("❌ Erro no admService:", error);
            throw error;
        }
    },
};

module.exports = admService;
