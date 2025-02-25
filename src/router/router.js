const { Router } = require("express");
const usuarios = require("./usuarioRotas");
const admRoutes = require("./admRotas"); 
const router = Router();

router.use('/paciente', usuarios);
router.use("/admin", admRoutes); 

module.exports = router;
