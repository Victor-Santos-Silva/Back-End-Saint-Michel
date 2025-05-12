const { Router } = require("express");
const consultaController = require("../controller/consultaController");
const router = Router();

//paciente

router.post("/concluir", consultaController.concluirConsulta);

router.post("/nao-compareceu", consultaController.naoCompareceu);

router.get("/historico", consultaController.listarHistorico);

module.exports = router;
