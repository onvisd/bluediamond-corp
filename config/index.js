import merge from 'lodash/merge';

import defaultConfig from './config.defaults';
import developmentConfig from './config.development';
import productionConfig from './config.production';

const config = merge({}, defaultConfig);

if(process.env.NODE_ENV === 'production')
    merge(config, productionConfig);
else
    merge(config, developmentConfig);


// For services like Amazon Elastic Compute Cloud and Heroku
if(process.env.PORT)
    config.web.port = process.env.PORT;

// For passing custom config via an environment variable.
// For frameworks like Docker.
// E.g. `config="{ \"key\": \"value\" }" npm start`.
if(process.env.CONFIG) {
    try {
        merge(config, JSON.parse(process.env.config));
    } catch (error) {
        console.error(error);
    }
}

export default config;
