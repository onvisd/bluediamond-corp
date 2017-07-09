import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import env from 'tools/env';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getCraft = action({
    namespace: 'CRAFT',
    event: 'GET_CRAFT',
    action: (http) => http.get(`/api/template/craft${env.development ? `?${Date.now()}` : ''}`),
    result: (state, result) => ({
        ...state,
        craft: result
    })
}, handler);

handler.addStateProperties('craft');

export const connector = stateConnector(handler);

export default handler.reducer({craft: {}});
