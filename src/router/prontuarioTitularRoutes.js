const { Router } = require("express");
const prontuarioTitularController = require("../controller/prontuarioTitularController.js");
const router = Router();

router.get("/", prontuarioTitularController.getAll);

router.get("/:id", prontuarioTitularController.getOne);

router.post("/", prontuarioTitularController.create);

module.exports = router;
