import merge from 'lodash/merge';

import defaultConfig from './defaults';
import developmentConfig from './development';
import productionConfig from './production';

const config = merge({}, defaultConfig);

if(process.env.NODE_ENV === 'production')
    merge(config, productionConfig);
else
    merge(config, developmentConfig);

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
