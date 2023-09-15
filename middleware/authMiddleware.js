const { verifyToken } = require('../auth');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Yetkilendirme başarısız. Token bulunamadı.' });
    }

    const token = authHeader.substring(7);
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
        return res.status(401).json({ error: 'Yetkilendirme başarısız. Geçersiz token.' });
    }

    next();
}

module.exports = authMiddleware;
