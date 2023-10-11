const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const genJwtToken = payload =>
    new Promise((resolve, reject) => {
        jwt.sign(
            { ...payload },
            secret,
            {
                algorithm: "RS512",
                expiresIn: "2h",
                issuer: JwtIssuer
            },
            (err, token) => {
                if (err) return reject(new Error("Error while generating Jwt Token."));
                return resolve(token);
            }
        );
    });


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    const tokenWithoutBearer = token.split(' ')[1];

    if (!tokenWithoutBearer) {
        return res.status(401).json({ message: 'Unauthorized Access!' });
    }

    jwt.verify(tokenWithoutBearer, secret, (err, decoded) => {
        if (err) {
            console.log("err",err);
            return res.status(401).json({ message: 'Invalid token!' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken, genJwtToken };
