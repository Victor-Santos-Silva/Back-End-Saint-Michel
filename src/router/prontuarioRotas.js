const { Router } = require("express");
const prontuarioController = require("../controller/prontuarioController");
const router = Router();

router.get("/", prontuarioController.getAll);

router.get("/:id", prontuarioController.getOne);

router.post("/", prontuarioController.create);

router.delete("/:id", prontuarioController.delete);

module.exports = router;
