const jwt = require('jsonwebtoken');

function generateAccessToken(uid, role) {
    return jwt.sign({uid, role}, process.env.TOKEN_SECRET, {
        expiresIn: "3d"
    });
}
function generatePrefreshToken(uid, role) {
    return jwt.sign({uid}, process.env.TOKEN_SECRET, {
        expiresIn: "7d"
    });
}

module.exports = {generateAccessToken, generatePrefreshToken}