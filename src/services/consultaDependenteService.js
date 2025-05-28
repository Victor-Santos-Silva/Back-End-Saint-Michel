const AgendamentoDependente = require('../models/AgendamentoDependente');
const Dependente = require('../models/DependenteAdicionado');
const ProntuarioDependente = require('../models/ProntuarioDependente');
const Usuario = require('../models/Usuario'); // Se necessário para histórico
const { Op } = require('sequelize');

const consultaDocenteService = {
  async concluirConsultaParente({ agendamento_id, problemaRelatado, recomendacaoMedico }) {
    // Buscar o agendamento no modelo AgendamentoDependente para garantir consistência
    const agendamento = await AgendamentoDependente.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }

    // Extrair o usuario_id do agendamento
    const usuario_id = agendamento.usuario_id;
    if (!usuario_id) {
      throw new Error('Usuário não associado ao agendamento.');
    }

    // Criar um novo prontuário vinculado ao agendamento e ao usuário
    await ProntuarioDependente.create({
      agendamento_id,
      usuario_id,
      problemaRelatado,
      recomendacaoMedico
    });

    // Atualizar o agendamento para finalizado
    await AgendamentoDependente.update(
      { status: 'finalizado' },
      { where: { id: agendamento_id } }
    );

    return { message: 'Consulta finalizada com sucesso.' };
  },


  async marcarComoNaoCompareceuParente(agendamento_id) {
    const agendamento = await AgendamentoDependente.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }

    await AgendamentoDependente.update(
      { status: 'nao_compareceu' },
      { where: { id: agendamento_id } }
    );

    // Verifica se já tem prontuário
    const prontuarioExistente = await ProntuarioDependente.findOne({
      where: { agendamento_id }
    });

    if (!prontuarioExistente) {
      await ProntuarioDependente.create({
        agendamento_id,
        problemaRelatado: 'Paciente não compareceu.',
        recomendacaoMedico: 'Reagendar.',
      });
    }

    return { message: 'Paciente marcado como não compareceu.' };
  },


  async listarHistoricoParente() {
    const consultasFinalizadas = await AgendamentoDependente.findAll({
      where: {
        [Op.or]: [
          { status: 'finalizado' },
          { status: 'nao_compareceu' }
        ]
      },
      include: [
        { model: ProntuarioDependente },
        { model: Usuario, as: 'usuario' }, // Ajuste o alias se necessário
        { model: Dependente } // Ajuste o alias se necessário
      ]
    });

    return consultasFinalizadas;
  }


};

module.exports = consultaDocenteService;
