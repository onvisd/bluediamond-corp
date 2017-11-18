import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import env from 'tools/env';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getStoreFilters = action({
    namespace: 'STORE',
    event: 'GET_FILTERS',
    action: (http) =>
        http.get(`/api/store/filters${env.development ? `?${Date.now()}` : ''}`)
            .then((result) => result)
            .catch((err) => console.log(err)),
    result: (state, result) => ({
        ...state,
        filters: result
    })
}, handler);

handler.addStateProperties('filters');

export const connector = stateConnector(handler);

export default handler.reducer({filters: {}});
