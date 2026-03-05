const { update } = require("../controller/agendamentoDependenteController");
const { AgendamentoDependente } = require("../models");

const agendamentoDependenteSerivce = {
  create: async (dados) => {
    const { paciente_id, especialidade, medico_id, dependente_id, data, hora } =
      dados;

    const agendamento = await AgendamentoDependente.create({
      paciente_id,
      especialidade,
      medico_id,
      dependente_id,
      data,
      hora,
    });

    return agendamento;
  },

  getAll: async () => {
    const agendamentos = await AgendamentoDependente.findAll();
    return agendamentos;
  },

  update: async (data) => {
    const { medico_id } = data;

    let agendamentos;
    if (medico_id) {
      agendamentos = await AgendamentoDependente.findAll({
        where: { medico_id: medico_id },
      });
    } else {
      agendamentos = await AgendamentoDependente.findAll();
    }
  },

  getById: async (data) => {
    const { id } = data;

    const agendamento = await AgendamentoDependente.findByPk(id, {
      include: [{ model: Paciente }, { model: Dependente }],
    });

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
  },
  delete: async (data) => {
    const { id } = data;
    const agendamento = await AgendamentoDependente.findByPk(id);
    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }
    await agendamento.destroy();
  },
  listarAgendamentosDependente: async (data) => {
    const { medico_id } = data;
    let agendamentoDependente;

    if (medico_id) {
      agendamentoDependente = await AgendamentoDependente.findAll({
        where: { medico_id: medico_id },
        include: [{ model: Paciente }, { model: Dependente }], // Apenas incluir relacionamentos válidos
      });
    } else {
      agendamentoDependente = await AgendamentoDependente.findAll({
        include: [{ model: Paciente }], // Incluir o paciente sempre
      });
    }
  },
};

module.exports = agendamentoDependenteSerivce;
