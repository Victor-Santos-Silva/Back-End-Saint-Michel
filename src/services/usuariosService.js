const Usuarios = require("../models/usuarios");
const bcrypt = require('bcrypt')

const usuariosService = {
    create: async (usuario) => {
        try {
            const { nome, idade, email, senha, cpf, endereco } = usuario;

            // Validação de campos no service (opcional)
            if (!nome || !idade || !email || !senha || !cpf || !endereco) {
                throw new Error('Todos os campos são obrigatórios.');
            }

            const hashSenha = await bcrypt.hash(senha, 10);

            // Tentar criar o usuário no banco
            return await Usuarios.create({ nome, idade, email, senha: hashSenha, cpf, endereco });
        } catch (error) {
            console.error('Erro no serviço de criação de usuário:', error);
            throw error; // Repassar o erro para o controller
        }
    },
    getById: async (id) => {
        try {
            const usuario = await Usuarios.findByPk(id);
            if (!usuario) {
                return null;
            }
            return usuario;
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar um unico usuario');
        }
    },
    getAll: async () => {
        try {
            return await Usuarios.findAll();
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar todos os usuarios');
        }
    }
}

module.exports = usuariosService;