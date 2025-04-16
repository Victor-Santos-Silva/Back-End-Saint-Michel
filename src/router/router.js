const { Router } = require("express");
const usuarios = require("./usuarioRotas");
const admRoutes = require("./admRotas");
const medicoRoutes = require("./medicoRotas");
const agendamento = require("./agendamentoRoutes");
const agendamentoDocente = require("./agendamentoDocenteRoutes");
const contato = require("./contatoRouter");
const exame = require("./exameRouter");
const duvidas = require("./duvidasRoutes")

const router = Router();

router.use('/duvidas', duvidas)
router.use('/paciente', usuarios);
router.use("/admin", admRoutes);
router.use("/medico", medicoRoutes)
router.use('/agendamento', agendamento);
router.use('/agendamentoDocente', agendamentoDocente);
router.use('/contato', contato);
router.use('/exame', exame);

module.exports = router;
