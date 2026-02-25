const { Router } = require("express");
const router = Router();
const pacienteController = require("../controller/pacienteController.js");
const authenticateToken = require("../middlewares/authenticateToken.js");

router.post("/cadastro", authenticateToken, pacienteController.create);

router.post("/login", pacienteController.login);

router.get("/", authenticateToken, pacienteController.getAll);

router.get("/:id", authenticateToken, pacienteController.getOne);

router.put("/:id", authenticateToken, pacienteController.update);

router.patch(
  "/esqueci-senha",
  authenticateToken,
  pacienteController.esqueciSenha,
);

router.delete("/:id", authenticateToken, pacienteController.delete);

module.exports = router;
