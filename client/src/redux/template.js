import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getTemplate = action({
    namespace: 'TEMPLATE',
    event: 'GET_TEMPLATE',
    action: (name, http) => http.get(`/api/template/${name}`),
    result: (state, result) => ({
        ...state,
        template: result
    })
}, handler);

handler.addStateProperties('template');

export const connector = stateConnector(handler);

export default handler.reducer({template: {}});
