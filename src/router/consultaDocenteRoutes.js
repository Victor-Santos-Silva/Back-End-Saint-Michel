//parente
const { Router } = require("express");
const consultaDocenteController = require("../controller/consultaDocenteController.js");
const router = Router();


router.post("/concluir-parente", consultaDocenteController.concluirConsultaParente);

router.post("/nao-compareceu-parente", consultaDocenteController.naoCompareceuParente);

router.get("/historico-parente", consultaDocenteController.listarHistoricoParente);

module.exports = router;
