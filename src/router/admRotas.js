const { Router } = require("express");
const admController = require("../controller/admController");
const { validateAdmin, validateAdminId } = require("../middlewares/validateAdmin")
const router = Router();

//Login ADM
router.post("/login", admController.login);

//Cadastrar ADM
router.post("/cadastro", validateAdmin, admController.create);


//busca todos os admins
router.get('/', admController.getAll);

// funcao buscar unico
router.get('/:id', validateAdminId, admController.getOne);

// funcao de editar ADM
router.put('/:id', validateAdminId, admController.update);

//funçao de esqueci senha
router.put('/esqueciSenha/:id', validateAdminId, admController.esqueciSenha)

// funcao de deletar
router.delete('/:id', validateAdminId, admController.delete);


module.exports = router;
