const express = require("express");
const router = express.Router();
const agendamentoDependenteController = require("../controller/agendamentoDependenteController.js");
const authenticateToken = require("../middlewares/authenticateToken.js");

router.post("/", authenticateToken, agendamentoDependenteController.create);
router.get("/", authenticateToken, agendamentoDependenteController.getAll);
router.get(
  "/agendamentoGeralDependente",
  authenticateToken,
  agendamentoDependenteController.listarAgendamentosDependente,
);
router.get("/:id", authenticateToken, agendamentoDependenteController.getById);
router.put("/:id", authenticateToken, agendamentoDependenteController.update);
router.delete("/:id", authenticateToken, agendamentoDependenteController.delete);

module.exports = router;
