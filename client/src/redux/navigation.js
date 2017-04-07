import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getNavigation = action({
    namespace: 'NAVIGATION',
    event: 'GET_NAVIGATION',
    action: (http) => http.get('/api/navigation'),
    result: (state, result) => ({
        ...state,
        navigation: result
    })
}, handler);

handler.addStateProperties('navigation');

export const connector = stateConnector(handler);

export default handler.reducer({navigation: {}});
