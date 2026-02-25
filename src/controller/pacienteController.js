const PacientesService = require("../services/pacienteService.js");

const pacientesController = {
  login: async (req, res) => {
    try {
      const paciente = await PacientesService.login(req.body);

      return res.status(200).json({
        msg: "Login realizado",
        paciente,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const cadastroPaciente = await PacientesService.create(req.body);
      res.status(201).json({
        message: "Paciente cadastrado com sucesso!",
        paciente: cadastroPaciente,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  esqueciSenha: async (req, res) => {
    try {
      await PacientesService.esqueciSenha(req.body);

      return res.status(200).json({
        msg: "Senha atualizada com sucesso",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const pacientes = await PacientesService.getById(req.params.id);

      return res.status(200).json({ msg: "Paciente encontrado", pacientes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const Pacientes = await PacientesService.getAll();
      return res.status(200).json({ msg: "Todos os Pacientes!", Pacientes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const atualizacao = req.body;
      await PacientesService.update(id, atualizacao);
      res.status(200).json({ msg: "Paciente atualizado com sucesso!" });
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
