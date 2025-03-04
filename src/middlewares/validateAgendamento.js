const validateAgendamento = (req, res, next) => {
    const { departamento, profissional, data, tipo_consulta, convenio, plano } = req.body;

    if (!departamento || typeof departamento !== 'string'){
        return res.status(400).json({ msg: 'selecione uma opção'});
    }

    if (!profissional || typeof profissional !== 'string'){
        return res.status(400).json({ msg: 'selecione um campo'});
    
    }

    if (!data || typeof data !== 'string'){
        return res.status(400).json({ msg: 'selecione um campo'});

    }

    if (!tipo_consulta || typeof tipo_consulta !== 'string'){
        return res.status(400).json({ msg: 'selecione um campo'});

    }

    if (!convenio || typeof convenio !== 'string'){
        return res.status(400).json({ msg: 'selecione um campo'});

    }

    if (!plano || typeof plano !== 'string'){
            return res.status(400).json({ msg: 'selecione um campo'});

    }

    next();
}

module.exports = { validateAgendamento };
