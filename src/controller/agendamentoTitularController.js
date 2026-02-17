const AgendamentoTitular = require("../models/agendamentoTitular.js");
const Usuario = require("../models/Usuario.js");

const AgendamentoTitularController = {
  async criarAgendamentoTitular(req, res) {
    try {

      const { especialidade, medico_id, data, hora, nomeCompleto, dataDeNascimento, cpf, rg, genero, endereco, telefone, convenioMedico, planoConvenio, etnia, problema_saude, parentesco, tipoSanguineo, imagemGenero } = req.body;

      // Cria o agendamento no banco de dados
      const agendamentoDeTitular = await AgendamentoTitular.create({
        usuario_id: req.usuarioId,
        especialidade,
        medico_id,
        data,
        hora,
        nomeCompleto, dataDeNascimento, cpf, rg, genero, endereco, telefone, convenioMedico, planoConvenio, etnia, problema_saude, parentesco, tipoSanguineo, imagemGenero
      });

      res.status(201).json({ message: 'Agendamento criado com sucesso!', agendamentoDeTitular });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao criar agendamento.' });
    }
  },

  async listarAgendamentosTitular(req, res) {
    try {
      const { medico_id } = req.query;
      let AgendamentoTitulars;

      if (medico_id) {
        AgendamentoTitulars = await AgendamentoTitular.findAll({
          where: { medico_id: medico_id },
          include: [{ model: Usuario }], // Apenas incluir relacionamentos válidos
        });
      } else {
        AgendamentoTitulars = await AgendamentoTitular.findAll({
          include: [{ model: Usuario }], // Incluir o usuário sempre
        });
      }

      res.status(200).json({ AgendamentoTitulars: AgendamentoTitulars });
    } catch (error) {
      console.error("Erro ao listar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },


  async obterAgendamentoTitular(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await AgendamentoTitular.findByPk(id);

      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      res.status(200).json({
        AgendamentosTitular: agendamento
      });
    } catch (error) {
      console.error("Erro ao obter agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async atualizarAgendamentoTitular(req, res) {
    try {
      const { id } = req.params;
      const { nome, data, cpf, hora, endereco, genero, etnia, problema_saude, parentesco } = req.body;

      const agendamento = await AgendamentoTitular.findByPk(id);
      if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }

      await AgendamentoTitular.update(
        { nome, data, cpf, hora, endereco, genero, etnia, problema_saude, parentesco },
        { where: { id } }
      );
      res.status(200).json({ message: "Agendamento atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async deletarAgendamentoTitular(req, res) {
    try {
      const { id } = req.params;
      const AgendamentoTitular = await AgendamentoTitular.findByPk(id);

      if (!AgendamentoTitular) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      await AgendamentoTitular.destroy();
      res.status(200).json({ message: 'Agendamento deletado com sucesso!' });
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AgendamentoTitularController;
