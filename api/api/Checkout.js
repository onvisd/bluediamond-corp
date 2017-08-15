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
        .catch((err) => logger.error('Problem with checkoutCreate mutation', err, err.body));

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
        .catch((err) => logger.error(
          'Problem with checkoutCustomerAssociate mutation', err, err.body));

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
        .catch((err) => logger.error(
          'Problem with checkoutShippingAddressUpdate mutation', err, err.body));

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
        .catch((err) => logger.error(
          'Problem with checkoutLineItemsAdd mutation', err, err.body));

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
        .catch((err) => logger.error(
          'Problem with checkoutLineItemsRemove mutation', err, err.body));

    const getCheckout = (id) =>
        apolloClient.mutate({
            query: gql`
                query ($id: ID!) {
                    node(id: $id) {
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
                }
            `,
            variables: {id}
        })
        .then((result) => result.data.node)
        .catch((err) => logger.error('Problem with getCheckout query', err, err.body));

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
        .catch((err) => logger.error(
          'Problem with checkoutAttributesUpdate mutation', err, err.body));

    api.post('/store/checkout', async (req, res) => {
        if(!req.body.lineItems)
            res.status(400).send({message: 'You must add items to your cart'});

        try {
            const checkout = await createCheckout(req.body.lineItems);
            const accessToken = req.cookies.access_token;

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

                        res.status(201).send(syncAddress);
                    } else {
                        res.status(201).send(checkout);
                    }
                } else {
                    res.status(201).send(checkout);
                }
            } else {
                res.cookie('checkout_id', checkoutID, {
                    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
                });

                res.status(201).send(checkout);
            }
        } catch (err) {
            console.trace(err);
            logger.error('Problem creating new checkout', err, err.body);
            res.status(201).send({message: 'No cart exists yet!'});
        }
    });

    api.post('/store/getCheckout', async (req, res) => {
        const checkoutID = req.cookies['checkout_id'];

        try {
            if(checkoutID) {
                const checkout = await getCheckout(res.get(checkoutID));
                res.status(201).send(checkout);
            } else {
                res.status(201).send({message: 'No cart exists yet!'});
            }
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting checkout', err, err.body);
            res.status(201).send({message: 'No cart exists yet!'});
        }
    });

    api.put('/store/checkout/cart/add/:checkoutId', async (req, res) => {
        if(!req.body.lineItems)
            res.status(400).send({message: 'You must add items to your cart'});

        try {
            const updatedCheckout = await addToCart(req.params.checkoutId, req.body.lineItems);

            res.cookie('checkout_id', req.params.checkoutId);

            res.status(201).send(updatedCheckout);
        } catch (err) {
            console.trace(err);
            logger.error('Problem adding product to cart', err, err.body);
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
            logger.error('Problem removing item from cart', err, err.body);
            res.status(500).send(err.message);
        }
    });

    api.put('/store/checkout/cart/addAttribute/:checkoutId', async (req, res) => {
        if(!req.body.attributes)
            res.status(400).send({message: 'You must provide an attribute'});

        try {
            const updatedCheckout =
                await addAttribute(req.params.checkoutId, req.body.attributes);

            res.status(201).send(updatedCheckout);
        } catch (err) {
            console.trace(err);
            logger.error('Problem adding note to cart', err, err.body);
            res.status(500).send(err.message);
        }
    });
};
