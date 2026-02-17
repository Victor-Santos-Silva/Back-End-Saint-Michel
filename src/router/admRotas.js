const { Router } = require("express");
const admController = require("../controller/admController");
const { validateAdmin, validateAdminId } = require("../middlewares/validateAdmin")
const router = Router();

//Login ADM;
router.post("/login", admController.login);

//Cadastrar ADM
router.post("/cadastro", validateAdmin, admController.create);


//busca todos os admins
router.get('/', admController.getAll);

// funcao buscar unico
router.get('/:id', validateAdminId, admController.getOne);

router.delete('/:id', validateAdminId, admController.delete);

// funcao de editar ADM
//router.put('/:id', validateAdminId, admController.update);

//funçao de esqueci senha
//router.patch('/esqueciSenha', admController.esqueciSenha)

module.exports = router;