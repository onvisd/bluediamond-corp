import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getStoreProducts = action({
    namespace: 'STORE_PRODUCTS',
    event: 'GET_STORE_PRODUCTS',
    action: (http) => http.get('/api/store/products'),
    result: (state, result) => ({
        ...state,
        storeProducts: result
    })
}, handler);

handler.addStateProperties('storeProducts');

export const connector = stateConnector(handler);

export default handler.reducer({storeProducts: {}});
