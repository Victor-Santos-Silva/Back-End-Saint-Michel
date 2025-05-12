const service = require('../services/notificationService');
const { Notificacao } = require('../models');
const { createSchema } = require('../middlewares/notificationValidator');

// Criação de notificação
async function create(req, res) {
  const { error } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const id = await service.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Erro real ao criar notificação:', err);
    res.status(500).json({ error: 'Erro ao criar notificação' });
  }
}

// Listagem de notificações por usuário
async function list(req, res) {
  try {
    const user_id = parseInt(req.params.user_id, 10);
    if (isNaN(user_id)) return res.status(400).json({ error: 'ID de usuário inválido' });

    const data = await service.list(user_id);
    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar notificações:', err);
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
}

// Marcar notificação como lida
async function markRead(req, res) {
  try {
    const notificationId = parseInt(req.params.id, 10);
    if (isNaN(notificationId)) return res.status(400).json({ error: 'ID inválido' });

    const notification = await Notificacao.findOne({ where: { id: notificationId } });

    if (!notification) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    if (notification.lida) {
      return res.status(400).json({ error: 'Notificação já foi marcada como lida' });
    }

    await Notificacao.update({ lida: true }, { where: { id: notificationId } });

    return res.status(200).json({ message: 'Notificação marcada como lida com sucesso' });
  } catch (error) {
    console.error('Erro ao marcar como lida:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Remover notificação
async function remove(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    await service.remove(id);
    res.json({ message: 'Notificação removida' });
  } catch (err) {
    console.error('Erro ao remover notificação:', err);
    res.status(500).json({ error: 'Erro ao remover notificação' });
  }
}

module.exports = {
  create,
  list,
  markRead,
  remove,
};
