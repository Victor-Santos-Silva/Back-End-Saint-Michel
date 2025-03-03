const validateAdmin = (req, res, next) => {
    const { nome, email, senha } = req.body;

    // Validação do nome
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ msg: 'Nome é obrigatório e deve ser uma string válida.' });
    }

    // Validação do e-mail usando regex diretamente
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        return res.status(400).json({ msg: 'Formato de e-mail inválido.' });
    }

    // Validação da senha (mínimo de 6 caracteres)
    if (!senha || typeof senha !== 'string' || senha.length < 6) {
        return res.status(400).json({ msg: 'Senha deve ter pelo menos 6 caracteres.' });
    }

    next();
};

const validateAdminId = (req, res, next) => {
    const { id } = req.params;

    // Validação do ID (suporte a numérico e UUID)
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!id || (!uuidRegex.test(id) && isNaN(Number(id)))) {
        return res.status(400).json({ msg: 'Parâmetro id inválido.' });
    }

    next();
};

module.exports = { validateAdmin, validateAdminId };
