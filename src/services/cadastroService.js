const Cadastro = require("../models/cadastro");
const bcrypt = require('bcrypt');

const cadastroService = {
    create: async (cadastro) => {
        try {
            const { nome, idade, email, senha, repetir_senha, cpf, endereco } = cadastro;

            // Verifica se as senhas coincidem
            if (senha !== repetir_senha) {
                throw new Error('As senhas não coincidem.');
            }

            // Hash apenas na senha principal
            const hashSenha = await bcrypt.hash(senha, 10);
            const hashRepetirSenha = await bcrypt.hash(repetir_senha, 10);

            // Salva os dois campos no banco
            return await Cadastro.create({ 
                nome, idade, email, 
                senha: hashSenha, 
                repetir_senha: hashRepetirSenha, 
                cpf, endereco 
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            return await Cadastro.findByPk(id);
        } catch (error) {
            throw new Error('Erro ao buscar usuário.');
        }
    },
    getAll: async () => {
        try {
            return await Cadastro.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar usuários.');
        }
    }
};

module.exports = cadastroService;
