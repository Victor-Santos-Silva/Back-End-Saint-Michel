const { Router } = require("express");
const router = Router();
const pacienteController = require("../controller/pacienteController.js");
const authenticateToken = require("../middlewares/authenticateToken.js");

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gerenciamento de pacientes
 */

/**
 * @swagger
 * /paciente/cadastro:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeCompleto
 *               - data_nascimento
 *               - cpf
 *               - rg
 *               - genero
 *               - endereco
 *               - telefone
 *               - convenio_medico
 *               - plano_convenio
 *               - tipo_sanguineo
 *               - email
 *               - senha
 *             properties:
 *               nomeCompleto:
 *                type: string
 *               data_nascimento:
 *                type: string
 *                format: date
 *               cpf:
 *                type: string
 *                description: "CPF do paciente (formato: 000.000.000-00)"
 *               rg:
 *                type: string
 *               genero:
 *                type: string
 *                enum: [Masculino, Feminino, Outro]
 *               endereco:
 *                type: string
 *               telefone:
 *                type: string
 *               convenio_medico:
 *                type: string
 *               plano_convenio:
 *                type: string
 *               tipo_sanguineo:
 *                type: string
 *                enum: [A+, A-, B+, B-, AB+, AB-, O+, O-]
 *               email:
 *                type: string
 *               senha:
 *                type: string
 *
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/cadastro", authenticateToken, pacienteController.create);

/**
 * @swagger
 * /paciente/login:
 *   post:
 *     summary: Realiza login do paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", pacienteController.login);

/**
 * @swagger
 * /paciente:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/", authenticateToken, pacienteController.getAll);

/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     summary: Busca paciente por ID
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente não encontrado
 */
router.get("/:id", authenticateToken, pacienteController.getOne);

/**
 * @swagger
 * /paciente/{id}:
 *   put:
 *     summary: Atualiza paciente por ID
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       404:
 *         description: Paciente não encontrado
 */
router.put("/:id", authenticateToken, pacienteController.update);

/**
 * @swagger
 * /paciente/esqueci-senha:
 *   patch:
 *     summary: Atualiza senha do paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - novaSenha
 *             properties:
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.patch(
  "/esqueci-senha",
  authenticateToken,
  pacienteController.esqueciSenha,
);

/**
 * @swagger
 * /paciente/{id}:
 *   delete:
 *     summary: Remove paciente por ID
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente removido com sucesso
 *       404:
 *         description: Paciente não encontrado
 */
router.delete("/:id", authenticateToken, pacienteController.delete);

module.exports = router;
