const validateUsuario = (req, res, next) => {
    const { nomeUsuario, email } = req.body;

    if (!nomeUsuario || typeof nomeUsuario !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos.' });
    }

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos.' });
    }

    if (!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({ msg: 'Campo email invalido.' })
    }

    next();

}

const validadeUsuarioId = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ msg: 'Parametro id inválido.' })
    }
    next();
}

module.exports = { validateUsuario, validadeUsuarioId };