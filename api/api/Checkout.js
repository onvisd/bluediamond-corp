import gql from 'graphql-tag';
import * as auth from '../services/auth';
import logger from '../services/logger';

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
        .then((result) => result.data.checkoutCreate)
        .catch((err) => logger.error('Problem with checkoutCreate mutation', err, {lineItems}));

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
        .then((result) => result.data.checkoutCustomerAssociate)
        .catch((err) =>
            logger.error('Problem with checkoutCustomerAssociate mutation', err, {
                checkoutId,
                customerAccessToken
            })
        );

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
        .then((result) => result.data.checkoutShippingAddressUpdate)
        .catch((err) =>
            logger.error('Problem with checkoutShippingAddressUpdate mutation', err, {
                checkoutId
            })
        );

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
        .then((result) => result.data.checkoutLineItemsAdd)
        .catch((err) => {
            if(err.message.match('Checkout is already completed'))
                return {completed: true};

            logger.error('Problem with checkoutLineItemsAdd mutation', err, {
                checkoutId,
                lineItems
            });
            return {};
        });

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
        .then((result) => result.data.checkoutLineItemsRemove)
        .catch((err) => {
            if(err.message.match('Checkout is already completed'))
                return {completed: true};

            logger.error('Problem with checkoutLineItemsRemove mutation', err, {
                checkoutId,
                lineItemIds
            });
            return {};
        });

    const getCheckout = (id) =>
        apolloClient.query({
            query: gql`
                query ($id: ID!) {
                    node(id: $id) {
                        id
                        ... on Checkout {
                            webUrl
                            totalTax
                            subtotalPrice
                            totalPrice
                            orderStatusUrl
                            completedAt
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
                    }
                }
            `,
            variables: {id},
            fetchPolicy: 'network-only'
        })
        .then((result) => result.data.node)
        .catch((err) => logger.error('Problem with getCheckout query', err, {checkoutId: id}));

    const addAttribute = (checkoutId, input) =>
        apolloClient.mutate({
            mutation: gql`
                mutation ($checkoutId: ID!, $input: CheckoutAttributesUpdateInput!) {
                    checkoutAttributesUpdate(checkoutId: $checkoutId, input: $input) {
                        userErrors {
                            message
                        }
                    }
                }
            `,
            variables: {checkoutId, input}
        })
        .then((result) => result.data.checkout)
        .catch((err) => {
            if(err.message.match('Checkout is already completed'))
                return {completed: true};

            logger.error('Problem with checkoutAttributesUpdate mutation', err, {
                checkoutId,
                input
            });
            return {};
        });

    const createNewCheckout = async (req, res) => {
        try {
            const checkout = await createCheckout(req.body.lineItems || []);
            const accessToken = req.cookies.access_token;

            if(checkout) {
                const checkoutID = checkout.checkout.id;

                res.cookie('checkout_id', checkoutID, {
                    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
                });

                if(checkout.userErrors.length) {
                    res.status(400).send(checkout.userErrors[0].message);
                } else if(accessToken) {
                    const secureToken = await auth.decodeToken(accessToken);

                    if(secureToken) {
                        const associate = await addCustomer(
                            checkoutID,
                            secureToken.token
                        );

                        if(associate.checkout.customer.defaultAddress) {
                            // remove items from array as it fails the next mutation
                            delete associate.checkout.customer.defaultAddress.id;
                            delete associate.checkout.customer.defaultAddress.__typename;

                            const syncAddress = await setAddress(
                                checkoutID,
                                associate.checkout.customer.defaultAddress
                            );

                            res.status(200).send(syncAddress);
                        } else {
                            res.status(200).send(checkout.checkout);
                        }
                    } else {
                        res.status(200).send(checkout.checkout);
                    }
                } else {
                    res.cookie('checkout_id', checkoutID, {
                        maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
                    });

                    res.status(200).send(checkout.checkout);
                }
            } else {
                res.status(400).send({message: 'Problem creating new checkout, please try again'});
            }
        } catch (err) {
            console.trace(err);
            logger.error('Problem creating new checkout', err, req.body);
            res.status(200).send({message: 'No cart exists yet!'});
        }
    };

    api.post('/store/checkout', createNewCheckout);

    api.post('/store/getCheckout', async (req, res) => {
        const checkoutID = req.cookies['checkout_id'];

        try {
            if(checkoutID) {
                const checkout = await getCheckout(checkoutID);

                if(!checkout || checkout.completedAt)
                    createNewCheckout(req, res);
                else
                    res.status(200).send(checkout);
            } else {
                createNewCheckout(req, res);
            }
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting checkout', err, req.body);
            res.status(200).send({message: 'No cart exists yet!'});
        }
    });

    api.put('/store/checkout/cart/add/:checkoutId', async (req, res) => {
        if(!req.body.lineItems)
            return res.status(400).send({message: 'You must add items to your cart'});

        try {
            const updatedCheckout = await addToCart(req.params.checkoutId, req.body.lineItems);

            if(updatedCheckout.checkout && !updatedCheckout.completed) {
                res.cookie('checkout_id', req.params.checkoutId);
                res.status(200).send(updatedCheckout.checkout);
            } else {
                createNewCheckout(req, res);
            }
        } catch (err) {
            console.trace(err);
            logger.error('Problem adding item to cart', err, req.body);
            res.status(500).send(err.message);
        }
    });

    api.put('/store/checkout/cart/remove/:checkoutId', async (req, res) => {
        if(!req.body.lineItemIds)
            return res.status(400).send({message: 'You must provide items to delete'});

        try {
            const updatedCheckout =
                await removeFromCart(req.params.checkoutId, req.body.lineItemIds);

            if(updatedCheckout.checkout && !updatedCheckout.completed)
                res.status(200).send(updatedCheckout.checkout);
            else
                createNewCheckout(req, res);
        } catch (err) {
            console.trace(err);
            logger.error('Problem removing item from cart', err, req.body);
            res.status(500).send(err.message);
        }
    });

    api.put('/store/checkout/cart/addAttribute/:checkoutId', async (req, res) => {
        if(!req.body.attributes)
            return res.status(400).send({message: 'You must provide an attribute'});

        try {
            const updatedCheckout =
                await addAttribute(req.params.checkoutId, req.body.attributes);

            if(updatedCheckout.checkout && !updatedCheckout.completed)
                res.status(200).send(updatedCheckout.checkout);
            else
                createNewCheckout(req, res);
        } catch (err) {
            console.trace(err);
            logger.error('Problem adding note to cart', err, req.body);
            res.status(500).send(err.message);
        }
    });
};
