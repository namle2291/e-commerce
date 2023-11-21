const jwt = require('jsonwebtoken');

function generateAccessToken(uid, role) {
    return jwt.sign({_id: uid, role}, process.env.TOKEN_SECRET, {
        expiresIn: "15s"
    });
}
function generatePrefreshToken(uid) {
    return jwt.sign({_id: uid}, process.env.TOKEN_SECRET, {
        expiresIn: "60s"
    });
}

module.exports = {generateAccessToken, generatePrefreshToken}