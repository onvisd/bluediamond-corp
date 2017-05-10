import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getStoreProduct = action({
    namespace: 'STORE_PRODUCT',
    event: 'GET_STORE_PRODUCT',
    action: (slug, http) => http.get(`/api/store/products/${slug}`),
    result: (state, result) => ({
        ...state,
        storeProduct: result
    })
}, handler);

handler.addStateProperties('storeProduct');

export const connector = stateConnector(handler);

export default handler.reducer({storeProduct: {}});
