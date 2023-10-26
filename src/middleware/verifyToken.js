const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerToken  = req.header('authorization');
    const token = bearerToken.split(' ')[1];

    if (!token) return res.status(401).send('Unauthorized');

    try {
        jwt.verify(token, process.env.TOKEN_SECRET);

        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};
