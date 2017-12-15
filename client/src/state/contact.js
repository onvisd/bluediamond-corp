import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getContact = action({
    namespace: 'CONTACT',
    event: 'GET_CONTACT',
    action: (http) => http.get('/api/template/contact'),
    result: (state, result) => ({
        ...state,
        contact: result
    })
}, handler);

handler.addStateProperties('contact');

export const connector = stateConnector(handler);

export default handler.reducer({contact: {}});
