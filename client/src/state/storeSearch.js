import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const setStoreSearch = action({
    namespace: 'STORE_SEARCH',
    event: 'SET_STORE_SEARCH',
    result: 'query'
}, handler);

handler.addStateProperties('query');

export const connector = stateConnector(handler);

export default handler.reducer({query: {}});
