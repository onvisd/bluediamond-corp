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

    const updateCustomer = (customer, customerAccessToken) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
                    customerUpdate(
                        customer: $customer
                        customerAccessToken: $customerAccessToken
                    ) {
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {customer, customerAccessToken}
        });

    const addCustomerAddress = (address, customerAccessToken) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($address: MailingAddressInput!, $customerAccessToken: String!) {
                    customerAddressCreate(
                        address: $address
                        customerAccessToken: $customerAccessToken
                    ) {
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {address, customerAccessToken}
        });

    const editCustomerAddress = (address, id, customerAccessToken) =>
        apolloClient.mutate({
            mutation: gql`
                mutation (
                  $address: MailingAddressInput!, $id: ID!, $customerAccessToken: String!) {
                    customerAddressUpdate(
                        address: $address
                        id: $id
                        customerAccessToken: $customerAccessToken
                    ) {
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {address, id, customerAccessToken}
        });

    const deleteAddress = (id, customerAccessToken) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($id: ID!, $customerAccessToken: String!) {
                    customerAddressDelete(
                        id: $id
                        customerAccessToken: $customerAccessToken
                    ) {
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {id, customerAccessToken}
        });

    const getCustomer = (customerAccessToken) =>
        apolloClient.query({
            query: gql`
                query ($customerAccessToken: String!) {
                    customer(customerAccessToken: $customerAccessToken) {
                        id
                        displayName
                        firstName
                        lastName
                        email
                        phone
                        updatedAt
                        createdAt
                        acceptsMarketing
                        defaultAddress {
                            id
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
                                    id
                                    orderNumber
                                    customerUrl
                                    processedAt
                                    totalPrice
                                    lineItems(first: 5) {
                                        edges {
                                            node {
                                                title
                                                quantity
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        addresses(first: 5) {
                            edges {
                                node {
                                    id
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
            variables: {customerAccessToken},
            fetchPolicy: 'network-only'
        })
        .then((result) => result.data.customer);

    // Register the customer + sign the customer in
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
                    maxAge: 1825 * 24 * 60 * 60 * 1000 // 5 years
                });

                const customer = await getCustomer(customerToken.customerAccessToken.accessToken);

                res.status(201).send({authenticated: true, data: {...customer}});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    // Sign the customer in
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
                    maxAge: 1825 * 24 * 60 * 60 * 1000 // 5 years
                });

                const customer = await getCustomer(customerToken.customerAccessToken.accessToken);

                res.status(201).send({authenticated: true, data: {...customer}});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    // Update Customer
    api.post('/store/customer/update', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;

            if(accessToken) {
                const secureToken = await auth.decodeToken(accessToken);

                if(secureToken) {
                    await updateCustomer(req.body, secureToken.token);
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

    // Create new customer address
    api.post('/store/customer/createAddress', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;

            if(accessToken) {
                const secureToken = await auth.decodeToken(accessToken);

                if(secureToken) {
                    await addCustomerAddress(req.body, secureToken.token);
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

    // Update customer address
    api.post('/store/customer/updateAddress/:id', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;

            if(accessToken) {
                const secureToken = await auth.decodeToken(accessToken);

                if(secureToken) {
                    // mutation doesn't accept 'id' and fails, must remove
                    delete req.body.id;

                    await editCustomerAddress(req.body, req.params.id, secureToken.token);
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

    // Delete customer address
    api.post('/store/customer/deleteAddress/:id', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;

            if(accessToken) {
                const secureToken = await auth.decodeToken(accessToken);

                if(secureToken) {
                    await deleteAddress(req.params.id, secureToken.token);
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

    // Get Customer
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

    // Deauth/sign out
    api.get('/store/customer/signout', (req, res) => {
        res.cookie('access_token', '', {
            maxAge: -10000
        });
        res.send({ok: true});
    });
};
