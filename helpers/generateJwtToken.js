const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const genJwtToken = payload =>
    new Promise((resolve, reject) => {
        jwt.sign(
            { ...payload },
            secret,
            {
                expiresIn: "2h"
            },
            (err, token) => {
                console.log(err);
                if (err) return reject(new Error("Error while generating Jwt Token."));
                return resolve(token);
            }
        );
    });
module.exports = genJwtToken;