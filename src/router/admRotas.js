const { Router } = require("express");
const admController = require("../controller/admController");
const authenticateToken = require("../middlewares/authenticateToken");
const {
  validateAdmin,
  validateAdminId,
} = require("../middlewares/validateAdmin");
const router = Router();

//Login ADM;

router.post(
  "/cadastro",
  authenticateToken,
  validateAdmin,
  admController.create,
);

router.get("/", authenticateToken, admController.getAll);

router.get("/:id", authenticateToken, admController.getOne);

router.delete("/:id", authenticateToken, validateAdminId, admController.delete);

router.put(
  "/:id",
  authenticateToken,
  validateAdminId,
  validateAdmin,
  admController.update,
);

router.post("/login", admController.login);

module.exports = router;
