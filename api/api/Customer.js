/* eslint-disable camelcase */
import gql from 'graphql-tag';

import * as auth from '../services/auth';

export default (api, {apolloClient}) => {
    const registerCustomer = (email, password) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($email: String!, $password: String!) {
                    customerCreate(input: {
                        email: $email
                        password: $password
                    }) {
                        customer {
                            id
                        }
                    }
                }
            `,
            variables: {email, password}
        });

    const signinCustomer = (email, password) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($email: String!, $password: String!) {
                    customerAccessTokenCreate(input: {
                        email: $email
                        password: $password
                    }) {
                        customerAccessToken {
                            accessToken
                            expiresAt
                        }
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {email, password}
        })
        .then((result) => result.data.customerAccessTokenCreate);

    const getCustomer = (customerAccessToken) =>
        apolloClient.query({
            query: gql`
                query ($customerAccessToken: String!) {
                    customer(customerAccessToken: $customerAccessToken) {
                        id
                        defaultAddress {
                            address1
                            address2
                            city
                            firstName
                            lastName
                            name
                            provinceCode
                            zip
                        }
                        orders(first: 5) {
                            edges {
                                node {
                                    lineItems(first: 5) {
                                        edges {
                                            node {
                                                quantity
                                                title
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        addresses(first: 5) {
                            edges {
                                node {
                                    address1
                                    address2
                                    city
                                    firstName
                                    lastName
                                    name
                                    provinceCode
                                    zip
                                }
                            }
                        }
                    }
                }
            `,
            variables: {customerAccessToken}
        })
        .then((result) => result.data.customer);

    api.post('/store/customer/register', async (req, res) => {
        if(!req.body.email || !req.body.password)
            res.status(400).send({message: 'You must provide a username and password'});

        try {
            await registerCustomer(req.body.email, req.body.password);
            const customerToken = await signinCustomer(req.body.email, req.body.password);

            if(customerToken.userErrors.length) {
                res.status(400).send(customerToken.userErrors[0].message);
            } else {
                const secureToken = await auth.issueToken({
                    token: customerToken.customerAccessToken.accessToken
                });

                res.cookie('access_token', secureToken, {
                    maxAge: 24 * 60 * 60 * 1000, // 24 hours,
                    httpOnly: true
                });

                const customer = await getCustomer(customerToken.customerAccessToken.accessToken);

                res.status(201).send({authenticated: true, data: {...customer}});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    api.post('/store/customer/signin', async (req, res) => {
        if(!req.body.email || !req.body.password)
            res.status(400).send({message: 'You must provide a username and password'});

        try {
            const customerToken = await signinCustomer(req.body.email, req.body.password);

            if(customerToken.userErrors.length) {
                res.status(400).send(customerToken.userErrors[0].message);
            } else {
                const secureToken = await auth.issueToken({
                    token: customerToken.customerAccessToken.accessToken
                });

                res.cookie('access_token', secureToken, {
                    maxAge: 24 * 60 * 60 * 1000, // 24 hours,
                    httpOnly: true
                });

                const customer = await getCustomer(customerToken.customerAccessToken.accessToken);

                res.status(201).send({authenticated: true, data: {...customer}});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    api.get('/store/customer', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;

            if(accessToken) {
                const secureToken = await auth.decodeToken(accessToken);

                if(secureToken) {
                    const customer = await getCustomer(secureToken.token);

                    res.send({authenticated: true, data: {...customer}});
                }
            } else {
                res.status(401).send({authenticated: false});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
