const express = require("express");
const router = express.Router();
const notificacaoPacienteController = require("../controller/notificacaoPacienteController");
const validacoes = require("../middlewares/notificaacaoPacienteValidator");

router.post("/", validacoes.criar, notificacaoPacienteController.criar);
router.get("/:email", notificacaoPacienteController.listarPorEmail);
router.patch("/marcar-lida/:id", validacoes.marcarComoLida, notificacaoPacienteController.marcarComoLida);
router.delete("/:id", validacoes.deletar, notificacaoPacienteController.deletar);

module.exports = router;