const winston = require('winston');

import config from '../../config';
import Sentry from './sentry';

const transports = [];
if(config.env !== 'production') {
    transports.push(new winston.transports.Console({
        level: 'silly',
        colorize: true
    }));
}

if(config.logging.sentry.url) {
    transports.push(new Sentry({
        level: 'warn',
        patchGlobal: true
    }));
}

module.exports = new winston.Logger({transports});
