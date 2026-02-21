const { Router } = require("express");
const admController = require("../controller/admController");
const {
  validateAdmin,
  validateAdminId,
} = require("../middlewares/validateAdmin");
const router = Router();

//Login ADM;

router.post("/cadastro", validateAdmin, admController.create);

router.get("/",validateAdmin, admController.getAll);

router.get("/:id", validateAdminId, admController.getOne);

router.delete("/:id", validateAdminId, admController.delete);

router.put("/:id", validateAdminId, admController.update);

router.post("/login", admController.login);

//router.patch('/esqueciSenha/:id', admController.esqueciSenha)

module.exports = router;