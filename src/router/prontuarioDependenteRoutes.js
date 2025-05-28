const { Router } = require("express");
const ProntuarioDependenteController = require("../controller/prontuarioDependenteController.js");
const router = Router();

router.get("/", ProntuarioDependenteController.getAll);

router.get("/:id", ProntuarioDependenteController.getOne);

router.post("/", ProntuarioDependenteController.create);

module.exports = router;
