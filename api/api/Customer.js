/* eslint-disable camelcase */
import axios from 'axios';

import config from '../../config';

import {setCached} from '../services/cache';

export default (api) => {
    api.get('/store/customer/:id', (req, res) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `customers/${req.params.id}.json`
        )
        .then((response) => {
            setCached(`store_customer_${req.params.id}`);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    api.post('/store/customer', (req, res) =>
        axios.post(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            'customers.json',
            {customer: {
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation,
                send_welcome_email: false
            }}
        )
        .then((response) => {
            setCached(`store_customer_${response.data.id}`);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    api.put('/store/customer', (req, res) =>
        axios.put(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `customers/${req.params.id}.json`
        )
        .then((response) => {
            setCached(`store_customer_${req.params.id}`);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    api.delete('/store/customer', (req, res) =>
        axios.delete(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `customers/${req.params.id}.json`
        )
        .then((response) => {
            setCached(`store_customer_${req.params.id}`);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
