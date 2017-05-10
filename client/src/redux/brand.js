import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getBrand = action({
    namespace: 'BRAND',
    event: 'GET_BRAND',
    action: (slug, http) => http.get(`/api/brands/${slug}`),
    result: (state, result) => ({
        ...state,
        brand: result
    })
}, handler);

handler.addStateProperties('brand');

export const connector = stateConnector(handler);

export default handler.reducer({brand: {}});
