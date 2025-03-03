const validateMedico = (req, res, next) => {
    const { crm, senha } = req.body;

    if (!crm || isNaN(Number(crm)) || Number(crm) <= 0) {
        return res.status(400).json({ msg: 'CRM inválido! Deve ser um número positivo.' });
    }
    next();
};

const validateMedicoId = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ msg: 'Parâmetro ID inválido. Deve ser um número positivo.' });
    }

    next();
};

module.exports = { validateMedico, validateMedicoId };
