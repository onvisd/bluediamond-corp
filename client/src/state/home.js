import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getHome = action({
    namespace: 'HOME',
    event: 'GET_HOME',
    action: (search, http) => http.get(`/api/template/home?${search.replace(/^\?/, '')}`),
    result: (state, result) => ({
        ...state,
        home: result
    })
}, handler);

handler.addStateProperties('home');

export const connector = stateConnector(handler);

export default handler.reducer({home: {}});
