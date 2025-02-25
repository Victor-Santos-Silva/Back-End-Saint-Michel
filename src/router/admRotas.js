const { Router } = require("express");
const admController = require("../controller/admController");
const { validateAdmin, validadeAdminId } = require("../middlewares/validateAdmin")
const router = Router();

router.post("/login", admController.login);
router.post("/cadastro", validateAdmin, admController.create);

module.exports = router;
