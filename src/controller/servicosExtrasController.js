const servicosExtrasService = require("../services/servicosExtrasService");

const criar = async (req, res) => {
  try {
    const resultado = await servicosExtrasService.criar(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

const listarTodos = async (req, res) => {
  try {
    const resultado = await servicosExtrasService.listarTodos();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const resultado = await servicosExtrasService.buscarPorId(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const resultado = await servicosExtrasService.atualizar(req.params.id, req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

const deletar = async (req, res) => {
  try {
    const resultado = await servicosExtrasService.deletar(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

const buscarPorTermo = async (req, res) => {
  try {
    const termo = req.query.termo;
    if (!termo) throw new Error("Parâmetro 'termo' é obrigatório");
    const resultado = await servicosExtrasService.buscarPorTermo(termo);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
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