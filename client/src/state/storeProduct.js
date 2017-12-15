import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getStoreProduct = action({
    namespace: 'STORE',
    event: 'GET_PRODUCT',
    action: (slug, http) =>
        http.get(`/api/store/product/${slug}`),
    result: (state, result) => ({
        ...state,
        product: result
    })
}, handler);

handler.addStateProperties('product');

export const connector = stateConnector(handler);

export default handler.reducer({product: {}});
