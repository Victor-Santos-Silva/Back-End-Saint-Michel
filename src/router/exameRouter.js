const { Router } = require("express");
const router = Router();
const examePacienteController = require("../controller/examePacienteController");
const pdf = require("../config/pdfConfig");

router.post("/criarexame", pdf.single("pedidoMedico"), examePacienteController.create)
router.get("/ver", examePacienteController.getAll)
router.get("/exame/:id", examePacienteController.getOne)

module.exports = router;