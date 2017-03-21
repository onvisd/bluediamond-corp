import http from 'http';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import proxy from 'express-http-proxy';

import config from '../config';

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use('/assets', express.static(path.join(__dirname, '../client/build/assets')));

// Proxy /api requests to API server
app.use('/api', proxy(`http://localhost:${config.services.api.port}`));

// Proxy all the other requests to rendering server
app.use(proxy(`http://localhost:${config.services.rendering.port}`));

app.server.listen(config.web.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
