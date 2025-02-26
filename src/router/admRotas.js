const { Router } = require("express");
const admController = require("../controller/admController");
const { validateAdmin, validadeAdminId } = require("../middlewares/validateAdmin")
const router = Router();

//busca todos os admins
router.get('/', admController.getAll);

// funcao buscar unico
router.get('/:id', validadeAdminId, admController.getOne);

//Login ADM
router.post("/login", admController.login);

//Cadastrar ADM
router.post("/cadastro", validateAdmin, admController.create);

// funcao de editar ADM
router.put('/:id', validateAdmin, validadeAdminId, admController.update);

//funçao de esqueci senha
router.put('/:id', validateAdmin, validadeAdminId, admController.esqueciSenha)

// funcao de deletar
router.delete('/:id', validadeAdminId, admController.delete);


module.exports = router;
