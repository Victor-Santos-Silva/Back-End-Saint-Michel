const Cadastro = require('../models/cadastro'); // Certifique-se de que está apontando para o model correto
const bcrypt = require('bcrypt');

const loginService = {
    autenticar: async (email, senha) => {
        try {
            console.log(`Buscando usuário com email: ${email}`);

            const usuario = await Cadastro.findOne({ where: { email } });

            if (!usuario) {
                console.log('Usuário não encontrado.');
                return null;
            }

            console.log('Usuário encontrado:', usuario.email);

            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                console.log('Senha incorreta.');
                return null;
            }

            return usuario;
        } catch (error) {
            console.error('Erro no loginService:', error);
            throw error;
        }
    }
};

module.exports = loginService;
