import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const createCheckout = action({
    namespace: 'CHECKOUT',
    event: 'CREATE',
    action: (data, http) => http.post('/api/store/checkout', data),
    result: (state, result) => ({
        ...state,
        ...result
    })
}, handler);

export const getCheckout = action({
    namespace: 'CHECKOUT',
    event: 'GET',
    action: (http) => http.post('/api/store/getCheckout'),
    result: (state, result) => ({
        ...state,
        ...result
    })
}, handler);

export const addToCart = action({
    namespace: 'CHECKOUT',
    event: 'ADD_TO_CART',
    action: (data, http) => http.put(`/api/store/checkout/cart/add/${data.checkoutId}`, data),
    result: (state, result) => ({
        ...state,
        ...result
    })
}, handler);

export const removeFromCart = action({
    namespace: 'CHECKOUT',
    event: 'REMOVE_FROM_CART',
    action: (data, http) => http.put(`/api/store/checkout/cart/remove/${data.checkoutId}`, data),
    result: (state, result) => ({
        ...state,
        ...result
    })
}, handler);

handler.addStateProperties('checkout');

export const connector = stateConnector(handler);

export default handler.reducer({checkout: {}});
