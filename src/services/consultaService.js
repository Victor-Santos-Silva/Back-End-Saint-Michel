const Agendamento = require('../models/Agendamento');
const Prontuario = require('../models/Prontuario');
const Usuario = require('../models/Usuario'); // Se necessário para histórico
const { Op } = require('sequelize');

const consultaService = {
  async concluirConsulta({ agendamento_id, problemaRelatado, recomendacaoMedico }) {
    // Buscar o agendamento para garantir consistência
    const agendamento = await Agendamento.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }

    const usuario_id = agendamento.usuario_id; // Aqui estamos pegando o ID do paciente associado ao agendamento

    // Criar um novo prontuário vinculado ao agendamento
    await Prontuario.create({
      agendamento_id,  // Associando o prontuário com o agendamento
      usuario_id,      // Associando o prontuário com o usuário relacionado ao agendamento
      problemaRelatado,
      recomendacaoMedico
    });

    console.log('Novo prontuário criado');

    // Atualizar o agendamento para finalizado
    await Agendamento.update(
      { status: 'finalizado' },
      { where: { id: agendamento_id } }
    );
    console.log('Agendamento finalizado');

    return { message: 'Consulta finalizada com sucesso.' };
  },



  async marcarComoNaoCompareceu(agendamento_id) {
    const agendamento = await Agendamento.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }

    await Agendamento.update(
      { status: 'nao_compareceu' },
      { where: { id: agendamento_id } }
    );

    return { message: 'Paciente marcado como não compareceu.' };
  },


  async listarHistorico() {
    const consultasFinalizadas = await Agendamento.findAll({
      where: {
        [Op.or]: [
          { status: 'finalizado' },
          { status: 'nao_compareceu' }
        ]
      },
      include: [
        { model: Prontuario },
        { model: Usuario, as: 'usuario' } // Ajuste o alias se necessário
      ]
    });

    return consultasFinalizadas;
  },
};

module.exports = consultaService;
