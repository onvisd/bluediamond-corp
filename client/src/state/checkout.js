import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const createCheckout = action({
    namespace: 'CHECKOUT',
    event: 'CREATE',
    action: (data, http) => http.post('/api/store/checkout', data),
    result: (state, result) => ({
        ...state,
        checkout: result
    })
}, handler);

export const updateCheckout = action({
    namespace: 'CHECKOUT',
    event: 'UPDATE',
    action: (data, http) => http.put('/api/store/checkout', data),
    result: (state, result) => ({
        ...state,
        checkout: result
    })
}, handler);

export const removeCheckout = action({
    namespace: 'CHECKOUT',
    event: 'REMOVE',
    action: (id, http) => http.delete('/api/store/checkout', id),
    result: (state, result) => ({
        ...state,
        checkout: result
    })
}, handler);

handler.addStateProperties('checkout');

export const connector = stateConnector(handler);

export default handler.reducer({checkout: {}});
