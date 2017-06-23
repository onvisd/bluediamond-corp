import gql from 'graphql-tag';

export default (api, {apolloClient}) => {
    // Temporary, to show how to form queries
    api.post('/store/checkout-test', (req, res) =>
        apolloClient.query({
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
