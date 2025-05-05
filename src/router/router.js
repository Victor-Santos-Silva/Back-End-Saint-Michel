const { Router } = require("express");
const usuarios = require("./usuarioRotas");
const admRoutes = require("./admRotas");
const medicoRoutes = require("./medicoRotas");
const agendamento = require("./agendamentoRoutes");
const agendamentoDocente = require("./agendamentoDocenteRoutes");
const contato = require("./contatoRouter");
const exame = require("./exameRouter");
const duvidas = require("./duvidasRoutes");
const cepRoutes = require("./cepRotas"); // Importação da nova rota de CEP
const prontuario = require("./prontuarioRotas"); // Importação da nova rota de prontuário
const router = Router();

router.use('/duvidas', duvidas);
router.use('/paciente', usuarios);
router.use("/admin", admRoutes);
router.use("/medico", medicoRoutes);
router.use('/agendamento', agendamento);
router.use('/agendamentoDocente', agendamentoDocente);
router.use('/contato', contato);
router.use('/exame', exame);
router.use('/cep', cepRoutes); // Adicionando a rota de CEP
router.use('/prontuario', prontuario);
module.exports = router;