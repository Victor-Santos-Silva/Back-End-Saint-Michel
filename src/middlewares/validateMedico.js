const validateMedico = (req, res, next) => {
    const { crm, senha } = req.body;

    // Validação do CRM (verifica se é uma string não vazia)
    if (!crm || typeof crm !== 'string' || crm.trim() === '') {
        return res.status(400).json({ msg: 'CRM inválido! Deve ser uma string não vazia.' });
    }

    // Validação da senha
    if (!senha || typeof senha !== 'string' || senha.length < 6) {
        return res.status(400).json({ msg: 'Senha deve ter pelo menos 6 caracteres.' });
    }

    next();
};

const validateMedicoId = (req, res, next) => {
    const { id } = req.params;

    // Regex para validar UUID
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!id || (!uuidRegex.test(id) && isNaN(Number(id)))) {
        return res.status(400).json({ msg: 'Parâmetro ID inválido. Deve ser um número positivo ou um UUID válido.' });
    }

    next();
};

module.exports = { validateMedico, validateMedicoId };
