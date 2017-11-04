import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const setStoreNavigation = action({
    namespace: 'STORE_NAVIGATION',
    event: 'SET_STORE_NAVIGATION',
    action(isStorePage) {
        return new Promise((resolve) => {
            resolve(isStorePage);
        });
    },
    result: (state, result) => ({
        ...state,
        isStorePage: result
    })
}, handler);

handler.addStateProperties('isStorePage');

export const connector = stateConnector(handler);

export default handler.reducer({isStorePage: false});
