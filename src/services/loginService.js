const Cadastro = require('../models/cadastro'); // Certifique-se de que está apontando para o model correto
const bcrypt = require('bcrypt');
const Adm = require('../models/adm'); // Importando o modelo de Admin

const loginService = {
    autenticar: async (email, senha) => {
        try {
            console.log(`Buscando usuário com email: ${email}`);

            // Buscando o admin com o email fornecido
            const usuario = await Adm.findOne({ where: { email } });

            if (!usuario) {
                console.log('Admin não encontrado.');
                return null;
            }

            console.log('Admin encontrado:', usuario.email);

            // Verificando se o usuário é um admin
            if (!usuario.isAdmin) {
                console.log('Acesso negado! Apenas administradores podem entrar.');
                return null; // Se não for admin, retorna null
            }

            // Verificando a senha
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                console.log('Senha incorreta.');
                return null;
            }

            return usuario; // Retorna o usuário admin autenticado
        } catch (error) {
            console.error('Erro no loginService:', error);
            throw error;
        }
    }
};

module.exports = loginService;
