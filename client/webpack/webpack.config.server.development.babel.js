import cloneDeep from 'lodash/cloneDeep';

import webpackBaseConfig from './webpack.config.server';
import appConfig from '../../config';

const config = cloneDeep(webpackBaseConfig);

// Network path for static files: fetch all statics from webpack development server
config.output.publicPath =
    `http://localhost:${appConfig.webpack.devserver.port}${config.output.publicPath}`;

export default config;
