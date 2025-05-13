const { Router } = require("express");
const usuarios = require("./usuarioRotas");
const admRoutes = require("./admRotas");
const medicoRoutes = require("./medicoRotas");
const agendamento = require("./agendamentoRoutes");
const agendamentoDocente = require("./agendamentoDocenteRoutes");
const contato = require("./contatoRouter");
const notificacaoRoutes = require("./notificationRoutes");
const exame = require("./exameRouter");
const duvidas = require("./duvidasRoutes");
const cepRoutes = require("./cepRotas"); 

const prontuario = require("./prontuarioRotas");
const prontuarioDocente = require("./prontuarioDocenteRoutes.js");

const consulta = require("./consultaRoutes");
const consultaDocente = require("./consultaDocenteRoutes.js");

const router = Router();

router.use('/duvidas', duvidas);
router.use('/paciente', usuarios);
router.use("/admin", admRoutes);
router.use("/medico", medicoRoutes);
router.use("/notificacoes", notificacaoRoutes);

router.use('/agendamento', agendamento);
router.use('/agendamentoDocente', agendamentoDocente);

router.use('/contato', contato);
router.use('/exame', exame);
router.use('/cep', cepRoutes);

router.use('/prontuario', prontuario);
router.use('/prontuarioDocente', prontuarioDocente);

router.use('/consulta', consulta)
router.use('/consultaDocente', consultaDocente)

module.exports = router;