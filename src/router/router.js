const { Router } = require("express");
const usuarios = require("./usuarioRotas");
const admRoutes = require("./admRotas");
const medicoRoutes = require("./medicoRotas");
const agendamento = require("./agendamentoRoutes");
const agendamentoTitular = require("./agendamentoTitularRoutes.js");
const contato = require("./contatoRouter");
const notificacaoRoutes = require("./notificationRoutes");
const exame = require("./exameRouter");
const duvidas = require("./duvidasRoutes");
const cepRoutes = require("./cepRotas");
const prontuario = require("./prontuarioRotas");
const prontuarioTitular = require("./prontuarioTitularRoutes.js");
const prontuarioDependente = require("./prontuarioDependenteRoutes.js");
const consulta = require("./consultaRoutes");
const consultaTitular = require("./consultaTitularRoutes.js");
const consultaDependente = require("./consultaDependenteRoutes.js");
const serviExtrasRotas = require("./servicosExtrasRotas.js");
const dependente = require("./dependenteRotas.js");
const agendamentoDependente = require("./agendamentoDependenteRoutes.js");

const chatbotRoutes = require("./chatbotRoutes.js");

const router = Router();

router.use("/administrador", admRoutes);
router.use("/duvidas", duvidas);
router.use("/paciente", usuarios);
router.use("/medico", medicoRoutes);
router.use("/notificacoes", notificacaoRoutes);

router.use("/agendamento", agendamento);
router.use("/agendamentoTitular", agendamentoTitular);

router.use("/contato", contato);
router.use("/exame", exame);
router.use("/cep", cepRoutes);

router.use("/prontuario", prontuario);
router.use("/prontuarioDependente", prontuarioDependente);
router.use("/prontuarioTitular", prontuarioTitular);

router.use("/consulta", consulta);
router.use("/consultaTitular", consultaTitular);
router.use("/consultaDependente", consultaDependente);

router.use("/servicos-extras", serviExtrasRotas);

router.use("/dependente", dependente);
router.use("/agendarDependente", agendamentoDependente);

router.use("/chatbot", chatbotRoutes);

module.exports = router;
