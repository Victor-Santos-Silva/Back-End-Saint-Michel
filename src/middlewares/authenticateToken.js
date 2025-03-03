const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Extraindo o token do header Authorization
    const token = req.headers["authorization"]?.split(" ")[1];

    // Verificando se o token existe
    if (!token) {
        return res.status(401).json({
            msg: "Token não fornecido. Acesso negado."
        });
    }

    // Verificando e validando o token
    jwt.verify(token, process.env.SECRET, (err, admin) => {
        if (err) {
            return res.status(403).json({
                msg: "Token inválido. Acesso negado."
            });
        }

        // O token é válido, então anexamos o admin (usuário) no objeto da requisição
        req.user = admin;
        next();
    });
}

module.exports = authenticateToken;
