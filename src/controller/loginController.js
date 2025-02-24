const loginService = require('../services/loginService');

const loginController = {
    login: async (req, res) => {
        try {
            console.log('Recebendo requisição de login:', req.body); // Log para verificar os dados recebidos
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            // Chama o serviço de autenticação, agora com a verificação de admin
            const usuario = await loginService.autenticar(email, senha);
            
            if (!usuario) {
                return res.status(403).json({ error: 'Acesso negado! Apenas administradores podem entrar.' });
            }

            // Se for um admin válido, retorna os dados do admin sem a senha
            res.status(200).json({
                message: 'Login realizado com sucesso',
                username: usuario.email, // Retorna o email (ou outro dado que você prefira)
                id: usuario.id, // Retorna o ID do admin
                isAdmin: usuario.isAdmin // Informa se é admin
            });
        } catch (error) {
            console.error('Erro no loginController:', error); // Log para capturar o erro real
            res.status(500).json({ error: 'Erro no servidor.' });
        }
    }
};

module.exports = loginController;
