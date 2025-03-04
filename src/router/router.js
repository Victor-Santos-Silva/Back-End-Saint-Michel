const { Router } = require("express");
const usuarios = require("./usuarioRotas");
const admRoutes = require("./admRotas");
const medicoRoutes = require("./medicoRotas");
const agendamento = require("./agendamentoRoutes");
const agendamentoDocente = require("./agendamentoDocenteRoutes");


const router = Router();

router.use('/paciente', usuarios);
router.use("/admin", admRoutes);
router.use("/medico", medicoRoutes)
router.use('/agendamento', agendamento);
router.use('/agendamentoDocente', agendamentoDocente);

module.exports = router;
