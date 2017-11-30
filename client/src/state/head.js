import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const setHead = action({
    namespace: 'HEAD',
    event: 'SET',
    payload: (tags) => ({tags}),
    result: (state, result) => ({
        ...state,
        tags: result.tags
    })
}, handler);

handler.addStateProperties('tags');

export const connector = stateConnector(handler);

export default handler.reducer({tags: []});
