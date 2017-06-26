import gql from 'graphql-tag';

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

            if(checkout.userErrors.length)
                res.status(400).send(checkout.userErrors[0].message);
            else
                res.status(201).send(checkout);
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
