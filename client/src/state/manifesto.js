import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import env from 'tools/env';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getManifesto = action({
    namespace: 'MANIFESTO',
    event: 'GET_MANIFESTO',
    action: (http) =>
        http.get(`/api/template/manifesto${env.development ? `?${Date.now()}` : ''}`),
    result: (state, result) => ({
        ...state,
        manifesto: result
    })
}, handler);

handler.addStateProperties('manifesto');

export const connector = stateConnector(handler);

export default handler.reducer({manifesto: {}});
