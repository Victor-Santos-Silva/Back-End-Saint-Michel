const { Router } = require("express");
const admController = require("../controller/admController");
const authenticateToken = require("../middlewares/authenticateToken");
const {
  validateUsuario,
  validadeUsuarioId,
} = require("../middlewares/validadeUsuario");
const router = Router();

//Login ADM;

router.post(
  "/cadastro",
  authenticateToken,
  validateUsuario,
  admController.create,
);

router.get("/", authenticateToken, admController.getAll);

router.get("/:id", authenticateToken, admController.getOne);

router.delete(
  "/:id",
  authenticateToken,
  validadeUsuarioId,
  admController.delete,
);

router.put(
  "/:id",
  authenticateToken,
  validadeUsuarioId,
  validateUsuario,
  admController.update,
);

router.post("/login", admController.login);

module.exports = router;
