const { Router } = require("express");
const router = Router();
const examePacienteController = require("../controller/examePacienteController");
const pdf = require("../config/pdfConfig");

router.post("/criarexame", pdf.single("pedidoMedico"), examePacienteController.create)
router.get("/", examePacienteController.getAll)
router.get("/:id", examePacienteController.getOne)

module.exports = router;