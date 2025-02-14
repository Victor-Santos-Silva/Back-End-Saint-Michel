const loginService = require('../services/loginService');

const loginController = {
    login: async (req, res) => {
        try {
            console.log('Recebendo requisição de login:', req.body); // Log para verificar os dados recebidos
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const usuario = await loginService.autenticar(email, senha);
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            res.status(200).json({ message: 'Login realizado com sucesso', usuario });
        } catch (error) {
            console.error('Erro no loginController:', error); // Log para capturar o erro real
            res.status(500).json({ error: 'Erro no servidor.' });
        }
    }
};

module.exports = loginController;
