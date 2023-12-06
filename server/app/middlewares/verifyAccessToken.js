const jwt = require('jsonwebtoken');

async function verifyAccessToken(req, res, next) {
    // headers: {Authorization: Bearer token}
    try {
        if (req?.headers?.authorization?.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_SECRET, function (err, decode) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
                req.user = decode;  
                next();
            });
        } else {
            return res.status(500).json({
                success: false,
                // Yêu cầu xác thực
                mesage: "Require Authentication!!!"
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = verifyAccessToken;