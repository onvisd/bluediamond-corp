import 'source-map-support/register';

import {server} from 'universal-webpack';
import settings from '../webpack/universal-webpack-settings';
import config from '../webpack/webpack.config';

server(config, settings);
