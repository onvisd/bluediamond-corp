import jwt from 'jsonwebtoken';

import config from '../../config';

export const issueToken = (user) =>
    jwt.sign(user, config.auth.tokenSecret, {expiresIn: '1825d'});

export const decodeToken = (token) =>
    new Promise(function(resolve, reject) {
        jwt.verify(token, config.auth.tokenSecret, (err, decoded) => {
            if(err) reject(err);
            else resolve(decoded);
        });
    });
