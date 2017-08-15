import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import raven from 'raven';
import api from './api';

import config from '../config';
import logger from './services/logger';

const app = express();
app.server = http.createServer(app);

// sentry logging
raven.Client(config.logging.sentry.url);

// logger
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// api router
app.use(api());

app.server.listen(config.services.api.port);

logger.info(
    `Started on port ${app.server.address().port}`
);

export default app;
