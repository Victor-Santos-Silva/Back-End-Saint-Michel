const PacientesService = require("../services/pacienteService.js");

const pacientesController = {
  login: async (req, res) => {
    try {
      const { date } = req.body;

      const pacientes = await PacientesService.login(date);

      return res.status(200).json({
        msg: "Login realizado",
        pacientes,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const cadastroPaciente = await PacientesService.create(req.body);
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        paciente: cadastroPaciente,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  esqueciSenha: async (req, res) => {
    const { date } = req.body;

    try {
      const pacientes = await PacientesService.esqueciSenha(date);

      return res.status(200).json({
        msg: "Senha atualizada com sucesso",
        pacientes,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const pacientes = await PacientesService.getById(req.params.id);

      return res.status(200).json({ msg: "Usuário encontrado", pacientes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const Pacientes = await PacientesService.getAll();
      return res.status(200).json({ msg: "Todos os Usuários!", Pacientes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const atualizacao = req.body;
      const atualizado = await PacientesService.update(id, atualizacao);
      res.status(200).json(atualizado);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletado = await PacientesService.delete(id);
      res.status(200).json(deletado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = pacientesController;
