const { Router } = require("express");
const medicoController = require("../controller/medicoController");
const {
  validateMedico,
  validateMedicoId,
} = require("../middlewares/validateMedico");
const authenticateToken = require("../middlewares/authenticateToken.js");
const upload = require("../config/uploadConfig"); // Middleware para upload de arquivos

const router = Router();

//Buscar medicos
router.get(
  "/medicos",
  authenticateToken,
  medicoController.buscarMedicosPorEspecialidade,
);

// Login do médico
router.post("/login", authenticateToken, medicoController.login);

// Cadastro de médico (suporte para upload de imagem)
router.post(
  "/cadastro",
  upload.single("foto"),
  validateMedico,
  medicoController.create,
);

// Buscar todos os médicos
router.get("/", authenticateToken, validateMedicoId, medicoController.findAll);

// Buscar médico por ID
router.get(
  "/:id",
  authenticateToken,
  validateMedicoId,
  medicoController.findById,
);

//
router.patch("/esqueciSenha", authenticateToken, medicoController.esqueciSenha);

// Atualizar dados do médico
router.put(
  "/:id",
  upload.single("foto"),
  authenticateToken,
  validateMedicoId,
  medicoController.update,
);

// Deletar médico por ID
router.delete(
  "/:id",
  authenticateToken,
  validateMedicoId,
  medicoController.delete,
);

module.exports = router;
