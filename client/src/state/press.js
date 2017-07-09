import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import env from 'tools/env';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getPress = action({
    namespace: 'PRESS',
    event: 'GET_PRESS',
    action: (http) =>
        http.get(`/api/template/press${env.development ? `?${Date.now()}` : ''}`),
    result: (state, result) => ({
        ...state,
        press: result
    })
}, handler);

handler.addStateProperties('press');

export const connector = stateConnector(handler);

export default handler.reducer({press: {}});
