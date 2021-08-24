const jwt = require('jsonwebtoken')

function signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

function verifyToken(access_token) {
    return jwt.verify(access_token, process.env.JWT_SECRET_KEY)
}

module.exports = { signToken, verifyToken }