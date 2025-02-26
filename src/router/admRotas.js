const { Router } = require("express");
const admController = require("../controller/admController");
const { validateAdmin, validadeAdminId } = require("../middlewares/validateAdmin")
const authenticateToken = require("../middlewares/authenticateToken.js");
const router = Router();

//Login ADM
router.post("/login", admController.login);

//Cadastrar ADM
router.post("/cadastro", validateAdmin, admController.create);


//busca todos os admins
router.get('/', authenticateToken, admController.getAll);

// funcao buscar unico
router.get('/:id', authenticateToken, validadeAdminId, admController.getOne);

// funcao de editar ADM
router.put('/:id', authenticateToken, validateAdmin, validadeAdminId, admController.update);

//funçao de esqueci senha
router.put('/:id', authenticateToken, validateAdmin, validadeAdminId, admController.esqueciSenha)

// funcao de deletar
router.delete('/:id', authenticateToken, validadeAdminId, admController.delete);


module.exports = router;
