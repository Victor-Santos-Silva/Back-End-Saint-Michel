const validateAdmin = (req, res, next) => {
    const { nome, email, senha } = req.body;

    // Validação do nome
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ msg: 'Nome é obrigatório e deve ser uma string válida.' });
    }

    // Validação do e-mail
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ msg: 'E-mail inválido.' });
    }

    // Usar uma regex para validar um formato de e-mail mais rigoroso
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: 'Formato de e-mail inválido.' });
    }

    // Validação da senha
    if (!senha || typeof senha !== 'string' || senha.length < 6) {  // Considerando 6 caracteres como mínimo para a senha
        return res.status(400).json({ msg: 'Senha deve ter pelo menos 6 caracteres.' });
    }

    next();
}

const validadeAdminId = (req, res, next) => {
    const { id } = req.params;

    // Validação do id
    if (!id || typeof id !== 'string' || id.trim() === '') {
        return res.status(400).json({ msg: 'Parâmetro id inválido.' });
    }
    next();
}

module.exports = { validateAdmin, validadeAdminId };
