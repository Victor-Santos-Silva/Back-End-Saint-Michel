//parente
const { Router } = require("express");
const consultaDependenteController = require("../controller/consultaDependenteController.js");
const router = Router();

router.post("/concluir", consultaDependenteController.concluirConsultaParente);

router.post("/nao-compareceu", consultaDependenteController.naoCompareceuParente);

router.get("/historico", consultaDependenteController.listarHistoricoParente);

module.exports = router;
