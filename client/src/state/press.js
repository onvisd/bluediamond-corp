import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getPress = action({
    namespace: 'PRESS',
    event: 'GET_PRESS',
    action: (search, http) =>
        http.get(`/api/template/press?${search.replace(/^\?/, '')}`),
    result: (state, result) => ({
        ...state,
        press: result
    })
}, handler);

handler.addStateProperties('press');

export const connector = stateConnector(handler);

export default handler.reducer({press: {}});
