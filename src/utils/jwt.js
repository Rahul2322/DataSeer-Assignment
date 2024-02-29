const jwt = require('jsonwebtoken')
const privateKey = process.env.JWT_KEY 

exports.signToken = async (data) => {
    const token =  jwt.sign(data, privateKey);
    return token
}

exports.verifyToken = async (token) => {
    const decodedValue =  jwt.verify(token, privateKey)
    return decodedValue
}
