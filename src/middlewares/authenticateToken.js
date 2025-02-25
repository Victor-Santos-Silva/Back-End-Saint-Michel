const jwt = require('jsonwebtoken');

function autenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            msg: "Acesso negado."
        })
    }

    jwt.verify(token, process.env.SECRET, (err, admin) => {
        if (err) {
            return res.status(403).json({
                msg: "Acesso negado."
            });
        }

        req.user = admin;
        next();
    })

}

module.exports = autenticateToken;