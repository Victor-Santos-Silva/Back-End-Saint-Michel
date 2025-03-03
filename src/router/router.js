const { Router } = require("express");
const usuarios = require("./usuarioRotas");
const admRoutes = require("./admRotas");
const medicoRoutes = require("./medicoRotas")
const router = Router();

router.use('/paciente', usuarios);
router.use("/admin", admRoutes);
router.use("/medico", medicoRoutes)

module.exports = router;
