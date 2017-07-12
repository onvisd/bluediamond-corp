require('dotenv').config();

import {clientConfiguration} from 'universal-webpack';
import settings from './universal-webpack-settings';
import config from './webpack.config';

export default (options) => clientConfiguration(config, settings, options);
