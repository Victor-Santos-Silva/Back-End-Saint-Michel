const validateAdmin = (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos.' });
    }

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos.' });
    }

    if (!senha || typeof senha !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos.' });
    }


    if (!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({ msg: 'Campo email invalido.' })
    }

    next();

}

const validadeAdminId = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ msg: 'Parametro id inválido.' })
    }
    next();
}

module.exports = { validateAdmin, validadeAdminId };