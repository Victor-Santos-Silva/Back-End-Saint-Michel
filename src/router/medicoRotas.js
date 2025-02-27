const { Router } = require("express");
const medicoController = require("../controller/medicoController");
const { validateMedico, validateMedicoId } = require("../middlewares/validateMedico")
const router = Router();

router.post("/login", medicoController.login);
router.post("/cadastro", validateMedico, medicoController.create);

module.exports = router;