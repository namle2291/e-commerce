const jwt = require('jsonwebtoken');

async function verifyAccessToken(req, res, next) {
    try {
        if (req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        mesage: "Invalid token"
                    });
                }
                req.user = decoded;
                next();
            });
        } else {
            return res.json({
                success: false,
                mesage: "Require Authentication!!!"
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = verifyAccessToken;