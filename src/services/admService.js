const Adm = require("../models/adm");
const bcrypt = require("bcrypt");

const admService = {
    create: async (cadastro) => {
        try {
            const { nome, email, senha } = cadastro;

            const hashSenha = await bcrypt.hash(senha, 10);

            return await Adm.create({
                nome, email, senha: hashSenha
            });
        } catch (error) {
            console.error('Erro ao criar Adm:', error);
            throw error;
        }
    },
    esqueciSenha: async (email, novaSenha) => {
        try {
            // Primeiro busca o admin pelo email
            const admin = await Adm.findOne({ where: { email } });

            if (!admin) {
                throw new Error("Adm não encontrado");
            }

            // Verifica se a nova senha tem pelo menos 6 caracteres
            if (novaSenha.length < 6) {
                throw new Error("A senha deve ter pelo menos 6 caracteres");
            }

            const hashSenha = await bcrypt.hash(novaSenha, 10);
            await admin.update({ senha: hashSenha });
            return admin;
        } catch (error) {
            throw new Error(error.message || "Ocorreu um erro ao trocar a senha do Admin");
        }
    },
    update: async (id, adminToUpdate) => {
        try {
            const admin = await Adm.findByPk(id);
            if (!admin) { // user for vazio
                return null;
            }
            await admin.update(adminToUpdate);
            await admin.save();
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao atualizar admin');
        }
    },
    getById: async (id) => {
        try {
            const admin = await Adm.findByPk(id);
            if (!admin) {
                return null;
            }
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar um unico admin');
        }
    },
    getAll: async () => {
        try {
            return await Adm.findAll();
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar todos os admins');
        }
    },
    delete: async (id) => {
        try {
            const user = await Adm.findByPk(id);
            if (!user) {
                return null;
            }
            await user.destroy();
            return user;
        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o admin');
        }
    }
};

module.exports = admService;
