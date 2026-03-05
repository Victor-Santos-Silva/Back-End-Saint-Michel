const { Router } = require("express");
const paciente = require("./pacienteRotas.js");
const admRoutes = require("./admRotas");
const medicoRoutes = require("./medicoRotas");
const agendamento = require("./agendamentoRoutes");
const contato = require("./contatoRouter");
const exame = require("./exameRouter");
const duvidas = require("./duvidasRoutes");
const cepRoutes = require("./cepRotas");
const prontuario = require("./prontuarioRotas");
const prontuarioDependente = require("./prontuarioDependenteRoutes.js");
const consulta = require("./consultaRoutes");
const consultaDependente = require("./consultaDependenteRoutes.js");
const serviExtrasRotas = require("./servicosExtrasRotas.js");
const dependente = require("./dependenteRotas.js");
const agendamentoDependente = require("./agendamentoDependenteRoutes.js");

const chatbotRoutes = require("./chatbotRoutes.js");

const router = Router();

router.use("/administrador", admRoutes);
router.use("/duvidas", duvidas);
router.use("/paciente", paciente);
router.use("/medico", medicoRoutes);

router.use("/agendamento", agendamento);

router.use("/contato", contato);
router.use("/exame", exame);
router.use("/cep", cepRoutes);

router.use("/prontuario", prontuario);
router.use("/prontuarioDependente", prontuarioDependente);

router.use("/consulta", consulta);
router.use("/consultaDependente", consultaDependente);

router.use("/servicos-extras", serviExtrasRotas);

router.use("/dependente", dependente);
router.use("/agendarDependente", agendamentoDependente);

router.use("/chatbot", chatbotRoutes);

module.exports = router;
