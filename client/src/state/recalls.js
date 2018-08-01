import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getRecallData = action({
    namespace: 'RECALLS',
    event: 'GET_RECALLS',
    action: (http) => http.get('/api/recalls'),
    result: (state, result) => ({
        ...state,
        recalls: result
    })
}, handler);


handler.addStateProperties('recalls');

export const connector = stateConnector(handler);

export default handler.reducer({recalls: {}});
