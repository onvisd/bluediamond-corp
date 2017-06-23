/* eslint-disable camelcase */
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';

// Polyfill fetch for node
import fetch from 'node-fetch'; // eslint-disable-line no-shadow
global.fetch = fetch;

import config from '../../config';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'https://bdgrowers.myshopify.com/api/graphql',
        opts: {
            headers: {
                'X-Shopify-Storefront-Access-Token': config.shopify.apiToken
            }
        }
    })
});

export default (api) => {
    // Temporary, to show how to form queries
    api.post('/store/checkout-test', (req, res) =>
        client.query({
            query: gql`
                {
                  shop {
                    name
                    primaryDomain {
                      url
                      host
                    }
                  }
                }
            `
        })
        .then((data) => res.send(data))
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        }));
};
