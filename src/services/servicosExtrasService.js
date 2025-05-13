const ServicosExtras = require("../models/ServicosExtras");

const criar = async (dados) => {
  try {
    return await ServicosExtras.create(dados);
  } catch (error) {
    throw new Error("Erro ao criar serviço extra: " + error.message);
  }
};

const listarTodos = async () => {
  try {
    return await ServicosExtras.findAll();
  } catch (error) {
    throw new Error("Erro ao listar serviços extras: " + error.message);
  }
};

const buscarPorId = async (id) => {
  try {
    const servico = await ServicosExtras.findByPk(id);
    if (!servico) throw new Error("Serviço extra não encontrado");
    return servico;
  } catch (error) {
    throw new Error("Erro ao buscar serviço extra: " + error.message);
  }
};

const atualizar = async (id, dados) => {
  try {
    const servico = await ServicosExtras.findByPk(id);
    if (!servico) throw new Error("Serviço extra não encontrado");
    await servico.update(dados);
    return servico;
  } catch (error) {
    throw new Error("Erro ao atualizar serviço extra: " + error.message);
  }
};

const deletar = async (id) => {
  try {
    const servico = await ServicosExtras.findByPk(id);
    if (!servico) throw new Error("Serviço extra não encontrado");
    await servico.destroy();
    return { mensagem: "Serviço extra deletado com sucesso" };
  } catch (error) {
    throw new Error("Erro ao deletar serviço extra: " + error.message);
  }
};

const buscarPorTermo = async (termo) => {
  try {
    return await ServicosExtras.findAll({
      where: {
        [Op.or]: [
          { tipoDeServico: { [Op.like]: `%${termo}%` } },
          { servicoExtra: { [Op.like]: `%${termo}%` } },
          { tipo: { [Op.like]: `%${termo}%` } }
        ]
      }
    });
  } catch (error) {
    throw new Error("Erro na busca por termo: " + error.message);
  }
};

module.exports = {
  criar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar,
  buscarPorTermo
};