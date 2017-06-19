/* eslint-disable camelcase */
import axios from 'axios';

import config from '../../config';
import * as auth from '../services/auth';

export default (api) => {
    // Ensure a user is logged in order to access certain api endpoints
    const verifyToken = async (req, res, next) => {
        try {
            const token = req.cookies.id_token;

            if(token) {
                await auth.decodeToken(token);

                // renew the token cookie
                res.cookie('id_token', token, {
                    maxAge: 24 * 60 * 60 * 1000, // 24 hours
                    httpOnly: true
                });

                return next();
            }

            res.redirect(302, '/signin');
        } catch (err) {
            console.trace(err);
            res.status(401).send(err.message);
        }
    };

    // register customer
    const registerCustomer = (customer) =>
        axios.post(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/customers.json',
            {customer}
        )
        .then((response) => response.data.customer);

    api.post('/store/customer/register', async (req, res) => {
        try {
            const salt = await auth.genSalt();

            const customer = {
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation,
                send_email_welcome: false,
                metafields: [
                    {
                        key: 'password_hash',
                        namespace: 'global',
                        value: await auth.hashPassword(salt, req.body.password),
                        value_type: 'string'
                    }
                ]
            };

            const newCustomer = await registerCustomer(customer);
            const token = await auth.issueToken({id: newCustomer.id});

            res.cookie('id_token', token, {
                maxAge: 24 * 60 * 60 * 1000, // 24 hours
                httpOnly: true
            });

            res.status(201).send({authenticated: true, data: {...newCustomer}});
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    // Get customer using their email
    const getCustomer = (email) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/customers/search.json?' +
            `query=email:${email}`
        )
        .then((response) => response.data.customers[0]);

    // Get customer metafields to retrieve hashed password
    const getMetafields = (id) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            `@bdgrowers.myshopify.com/admin/customers/${id}/metafields.json`
        )
        .then((response) =>
            response.data.metafields
                .find((metafield) => metafield.key === 'password_hash').value
        );

    api.post('/store/customer/signin', async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            if(!email || !password)
                res.status(401).send({message: 'You must provide a username and password'});

            const customer = await getCustomer(email);
            const hashedPassword = await getMetafields(customer.id);
            const correctPassword = await auth.comparePassword(password, hashedPassword);

            if(correctPassword) {
                const token = auth.issueToken({id: customer.id});

                res.cookie('id_token', token, {
                    maxAge: 24 * 60 * 60 * 1000, // 24 hours
                    httpOnly: true
                });

                res.status(200).send({authenticated: true, data: {...customer}});
            } else {
                res.status(401).send({message: 'Incorrect email or password'});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    api.get('/store/customer', async (req, res) => {
        try {
            const token = req.cookies.id_token;

            if(token) {
                const id = await auth.decodeToken(token);

                if(id) {
                    return axios.get(
                        `https://${config.shopify.key}:${config.shopify.pass}` +
                        '@bdgrowers.myshopify.com/admin/' +
                        `customers/${id.id}.json`
                    )
                    .then((response) => {
                        res.send({
                            authenticated: true,
                            data: {...response.data.customer}
                        });
                    });
                }
            } else {
                res.status(401).send({authenticated: false});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    api.put('/store/customer', verifyToken, (req, res) =>
        axios.put(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `customers/${req.params.id}.json`
        )
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    api.delete('/store/customer', verifyToken, (req, res) =>
        axios.delete(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `customers/${req.params.id}.json`
        )
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
