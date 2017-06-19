import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../config';

export const issueToken = (user) =>
    jwt.sign(user, config.auth.tokenSecret, {expiresIn: '24h'});

export const decodeToken = (token) =>
    new Promise(function(resolve, reject) {
        jwt.verify(token, config.auth.tokenSecret, (err, decoded) => {
            if(err) reject(err);
            else resolve(decoded);
        });
    });

export const genSalt = () =>
    new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) reject(err);
            else resolve(salt);
        });
    });

export const hashPassword = (salt, password) =>
    new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) reject(err);
            else resolve(hash);
        });
    });

export const comparePassword = (password, hashed) =>
    new Promise((resolve, reject) => {
        bcrypt.compare(password, hashed, (err, match) => {
            if(err) reject(err);
            else resolve(match);
        });
    });
