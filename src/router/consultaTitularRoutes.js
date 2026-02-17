//parente
const { Router } = require("express");
const consultaTitularController = require("../controller/consultaTitularController.js");
const router = Router();


router.post("/concluir-parente", consultaTitularController.concluirConsultaParente);

router.post("/nao-compareceu-parente", consultaTitularController.naoCompareceuParente);

router.get("/historico-parente", consultaTitularController.listarHistoricoParente);

module.exports = router;
