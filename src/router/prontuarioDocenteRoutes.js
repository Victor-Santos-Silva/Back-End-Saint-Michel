const { Router } = require("express");
const prontuarioDocenteController = require("../controller/prontuarioDocenteController.js");
const router = Router();

router.get("/", prontuarioDocenteController.getAll);

router.get("/:id", prontuarioDocenteController.getOne);

router.post("/", prontuarioDocenteController.create);

module.exports = router;
