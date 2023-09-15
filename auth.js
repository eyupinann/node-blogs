const jwt = require('jsonwebtoken');
const secretKey = 'Z34r#7!9k0O^12$FgAbC';

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = {
    verifyToken,
    secretKey
};
