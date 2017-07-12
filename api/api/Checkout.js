import gql from 'graphql-tag';
import * as auth from '../services/auth';

export default (api, {apolloClient}) => {
    const createCheckout = (lineItems) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($lineItems: [CheckoutLineItemInput!]) {
                    checkoutCreate(input: {
                        lineItems: $lineItems
                    }) {
                        checkout {
                            id
                            webUrl
                            totalTax
                            subtotalPrice
                            totalPrice
                            orderStatusUrl
                            lineItems(first: 250) {
                                edges {
                                    node {
                                        id
                                        title
                                        variant {
                                            id
                                            title
                                            image {
                                                src
                                            }
                                            price
                                            product {
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            src
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        quantity
                                    }
                                }
                            }
                        }
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {lineItems}
        })
        .then((result) => result.data.checkoutCreate);

    const addCustomer = (checkoutId, customerAccessToken) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($checkoutId: ID!, $customerAccessToken: String!) {
                    checkoutCustomerAssociate(
                        checkoutId: $checkoutId,
                        customerAccessToken: $customerAccessToken
                    ) {
                        checkout {
                            id
                            webUrl
                            totalTax
                            subtotalPrice
                            totalPrice
                            customer {
                                id
                                email
                                firstName
                                lastName
                                phone
                                defaultAddress {
                                    id
                                    firstName
                                    lastName
                                    address1
                                    address2
                                    city
                                    country
                                    province
                                    zip
                                }
                            }
                            lineItems(first: 250) {
                                edges {
                                    node {
                                        id
                                        title
                                        variant {
                                            id
                                            title
                                            image {
                                                src
                                            }
                                            price
                                            product {
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            src
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        quantity
                                    }
                                }
                            }
                        }
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {checkoutId, customerAccessToken}
        })
        .then((result) => result.data.checkoutCustomerAssociate);

    const setAddress = (checkoutId, shippingAddress) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
                    checkoutShippingAddressUpdate(
                        checkoutId: $checkoutId,
                        shippingAddress: $shippingAddress
                    ) {
                        checkout {
                            id
                            webUrl
                            totalTax
                            subtotalPrice
                            totalPrice
                            shippingAddress {
                                firstName
                                lastName
                                address1
                                address2
                                city
                                country
                                province
                                zip
                            }
                            customer {
                                id
                                email
                                firstName
                                lastName
                                phone
                            }
                            lineItems(first: 250) {
                                edges {
                                    node {
                                        id
                                        title
                                        variant {
                                            id
                                            title
                                            image {
                                                src
                                            }
                                            price
                                            product {
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            src
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        quantity
                                    }
                                }
                            }
                        }
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {checkoutId, shippingAddress}
        })
        .then((result) => result.data.checkoutShippingAddressUpdate);

    const addToCart = (checkoutId, lineItems) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
                    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
                        checkout {
                            id
                            webUrl
                            totalTax
                            subtotalPrice
                            totalPrice
                            orderStatusUrl
                            lineItems(first: 250) {
                                edges {
                                    node {
                                        id
                                        title
                                        variant {
                                            id
                                            title
                                            image {
                                                src
                                            }
                                            price
                                            product {
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            src
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        quantity
                                    }
                                }
                            }
                        }
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {checkoutId, lineItems}
        })
        .then((result) => result.data.checkoutLineItemsAdd);

    const removeFromCart = (checkoutId, lineItemIds) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($checkoutId: ID!, $lineItemIds: [ID!]!) {
                    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
                        checkout {
                            id
                            webUrl
                            totalTax
                            subtotalPrice
                            totalPrice
                            orderStatusUrl
                            lineItems(first: 250) {
                                edges {
                                    node {
                                        id
                                        title
                                        variant {
                                            id
                                            title
                                            image {
                                                src
                                            }
                                            price
                                            product {
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            src
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        quantity
                                    }
                                }
                            }
                        }
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {checkoutId, lineItemIds}
        })
        .then((result) => result.data.checkoutLineItemsRemove);

    api.post('/store/checkout', async (req, res) => {
        if(!req.body.lineItems)
            res.status(400).send({message: 'You must add items to your cart'});

        try {
            const checkout = await createCheckout(req.body.lineItems);
            const accessToken = req.cookies.access_token;

            if(checkout.userErrors.length) {
                res.status(400).send(checkout.userErrors[0].message);
            } else if(accessToken) {
                const secureToken = await auth.decodeToken(accessToken);

                if(secureToken) {
                    const associate = await addCustomer(
                        checkout.checkout.id,
                        secureToken.token
                    );

                    if(associate.checkout.customer.defaultAddress) {
                        // remove items from array as it fails the next mutation
                        delete associate.checkout.customer.defaultAddress.id;
                        delete associate.checkout.customer.defaultAddress.__typename;

                        const syncAddress = await setAddress(
                            checkout.checkout.id,
                            associate.checkout.customer.defaultAddress
                        );

                        res.status(201).send(syncAddress);
                    } else {
                        res.status(201).send(checkout);
                    }
                } else {
                    res.status(201).send(checkout);
                }
            } else {
                res.status(201).send(checkout);
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    api.put('/store/checkout/cart/add/:checkoutId', async (req, res) => {
        if(!req.body.lineItems)
            res.status(400).send({message: 'You must add items to your cart'});

        try {
            const updatedCheckout = await addToCart(req.params.checkoutId, req.body.lineItems);

            res.status(201).send(updatedCheckout);
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    api.put('/store/checkout/cart/remove/:checkoutId', async (req, res) => {
        if(!req.body.lineItemIds)
            res.status(400).send({message: 'You must provide items to delete'});

        try {
            const updatedCheckout =
                await removeFromCart(req.params.checkoutId, req.body.lineItemIds);

            res.status(201).send(updatedCheckout);
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
