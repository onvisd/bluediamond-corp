import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getProduct = action({
    namespace: 'PRODUCT',
    event: 'GET_PRODUCT',
    action: (slug, http) =>
        http.get(`/api/product/${slug}`),
    result: (state, result) => ({
        ...state,
        product: result
    })
}, handler);

handler.addStateProperties('product');

export const connector = stateConnector(handler);

export default handler.reducer({product: {}});
