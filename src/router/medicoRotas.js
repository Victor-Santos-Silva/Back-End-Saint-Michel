const { Router } = require("express");
const medicoController = require("../controller/medicoController");
const { validateMedico, validateMedicoId } = require("../middlewares/validateMedico");
const upload = require("../config/uploadConfig"); // Middleware para upload de arquivos

const router = Router();

// Login do médico
router.post("/login", medicoController.login);

// Cadastro de médico (suporte para upload de imagem)
router.post("/cadastro", upload.single("foto"), validateMedico, medicoController.create);

// Buscar todos os médicos
router.get("/", medicoController.findAll);

// Buscar médico por ID
router.get("/:id", validateMedicoId, medicoController.findById);

// Atualizar dados do médico
router.put("/:id", upload.single("foto"), validateMedicoId, medicoController.update);

// Deletar médico por ID
router.delete("/:id", validateMedicoId, medicoController.delete);

module.exports = router;
