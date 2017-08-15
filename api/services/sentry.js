import raven from 'raven';
import util from 'util';
import winston from 'winston';

import config from '../../config';

const Sentry = winston.transports.Sentry = function(options) {
    winston.Transport.call(this, {level: options.level});

    // Default options
    this.defaults = {
        patchGlobal: false,
        logger: 'root',
        levelsMap: {
            silly: 'debug',
            verbose: 'debug',
            info: 'info',
            debug: 'debug',
            warn: 'warning',
            error: 'error'
        },
        tags: {},
        extra: {},
        environment: config.env
    };

    this.options = Object.assign({}, this.defaults, options);
    this._sentry = this.options.raven || new raven.Client(config.logging.sentry.url, this.options);

    // Handle errors
    this._sentry.on('error', function(error) {
        let message = 'Cannot talk to sentry.';
        if(error && error.reason)
            message += ` Reason: ${error.reason}`;
        console.log(message);
    });

    // Expose sentry client to winston.Logger
    winston.Logger.prototype.sentry_client = this._sentry; // eslint-disable-line camelcase
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(Sentry, winston.Transport);

//
// Expose the name of this Transport on the prototype
Sentry.prototype.name = 'sentry';

Sentry.prototype.log = function(level, msg, meta, callback) {
    level = this.options.levelsMap[level];
    meta = meta || {};

    const extraData = Object.assign({}, meta);
    const tags = extraData.tags;
    const fingerprint = extraData.fingerprint;
    delete extraData.tags;
    delete extraData.fingerprint;

    const extra = {
        level,
        extra: extraData,
        tags,
        fingerprint
    };

    if(extraData.request) {
        extra.request = extraData.request;
        delete extraData.request;
    }

    if(extraData.user) {
        extra.user = extraData.user;
        delete extraData.user;
    }

    try {
        if(level === 'error') {
            // Support exceptions logging
            if(meta instanceof Error) {
                if(msg === '') {
                    msg = meta;
                } else {
                    meta.message = `${msg}. cause: ${meta.message}`;
                    msg = meta;
                }
            }

            this._sentry.captureException(msg, extra, function() {
                callback(null, true);
            });
        } else {
            this._sentry.captureMessage(msg, extra, function() {
                callback(null, true);
            });
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = Sentry;
