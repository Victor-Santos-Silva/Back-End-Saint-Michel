const { Router } = require("express");
const router = Router();
const pacienteController = require("../controller/pacienteController.js");

router.post("/cadastro", pacienteController.create);

router.post("/login", pacienteController.login);

router.get("/", pacienteController.getAll);

router.get("/:id", pacienteController.getOne);

//router.put('/:id', pacienteController.update);

//router.patch('/esqueci-senha', pacienteController.esqueciSenha);

router.delete("/:id", pacienteController.delete);

module.exports = router;
