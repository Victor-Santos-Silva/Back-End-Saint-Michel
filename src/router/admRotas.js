const { Router } = require("express");
const admController = require("../controller/admController");

const router = Router();

router.post("/login", admController.login);

module.exports = router;
