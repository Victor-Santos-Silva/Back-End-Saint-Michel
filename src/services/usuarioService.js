const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');

const usuarioService = {
    create: async (cadastro) => {
        try {
            const { nomeCompleto, dataDeNascimento, cpf, rg, genero, endereco, telefone, convenioMedico, planoConvenio, tipoSanguineo, email, senha, imagemGenero } = cadastro;

            // Hash apenas na senha principal
            const hashSenha = await bcrypt.hash(senha, 10);

            // Salva os dois campos no banco
            return await Usuario.create({
                nomeCompleto, dataDeNascimento, cpf, rg, genero,
                endereco, telefone, convenioMedico, planoConvenio, tipoSanguineo,
                email, senha: hashSenha, imagemGenero
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            return await Usuario.findByPk(id);
        } catch (error) {
            throw new Error('Erro ao buscar usuário.');
        }
    },
    getAll: async () => {
        try {
            return await Usuario.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar usuários.');
        }
    }
};

module.exports = usuarioService;
