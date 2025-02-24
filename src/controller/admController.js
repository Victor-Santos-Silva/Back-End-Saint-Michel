const admService = require("../services/admService");

const admController = {
    login: async (req, res) => {
        try {
            console.log("📩 Recebendo tentativa de login:", req.body);

            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            const usuario = await admService.autenticar(email, senha);

            if (!usuario) {
                return res.status(403).json({ error: "Acesso negado! Apenas administradores podem entrar." });
            }

            res.status(200).json({
                message: "✅ Login realizado com sucesso",
                username: usuario.email,
                isAdmin: usuario.isAdmin,
            });
        } catch (error) {
            console.error("❌ Erro no admController:", error);
            res.status(500).json({ error: "Erro no servidor." });
        }
    },
};

module.exports = admController;
