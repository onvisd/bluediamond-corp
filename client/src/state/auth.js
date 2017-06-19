import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const registerCustomer = action({
    namespace: 'AUTH',
    event: 'REGISTER_CUSTOMER',
    action: (creds, http) => http.post('/api/store/customer/register', creds),
    result: (state, result) => ({
        ...state,
        auth: result
    })
}, handler);

export const signinCustomer = action({
    namespace: 'AUTH',
    event: 'SIGNIN_CUSTOMER',
    action: (creds, http) => http.post('/api/store/customer/signin', creds),
    result: (state, result) => ({
        ...state,
        auth: result
    })
}, handler);

export const getCustomer = action({
    namespace: 'AUTH',
    event: 'GET_CUSTOMER',
    action: (http) =>
        http.get('/api/store/customer')
        .then((result) => result)
        .catch(() => ({authenticated: false})),
    result: (state, result) => ({
        ...state,
        auth: result
    })
}, handler);

handler.addStateProperties('auth');

export const connector = stateConnector(handler);

export default handler.reducer({auth: {}});
