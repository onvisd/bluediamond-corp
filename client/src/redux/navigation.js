import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getNavigationData = action({
    namespace: 'NAVIGATION',
    event: 'GET_NAVIGATION',
    action: (http) => http.get('/api/navigation'),
    result: (state, result) => ({
        ...state,
        navigation: {
            ...state.navigation,
            data: result
        }
    })
}, handler);

export const setNavigationStyle = action({
    namespace: 'NAVIGATION',
    event: 'SET_NAVIGATION_STYLE',
    action(style) {
        return new Promise((resolve) => {
            resolve(style);
        });
    },
    result: (state, result) => ({
        ...state,
        navigation: {
            ...state.navigation,
            style: result
        }
    })
}, handler);

export const setNavBreadcrumbs = action({
    namespace: 'NAVIGATION',
    event: 'SET_NAVIGATION_BREADCRUMBS',
    action(breadcrumbs) {
        return new Promise((resolve) => {
            resolve(breadcrumbs);
        });
    },
    result: (state, result) => ({
        ...state,
        navigation: {
            ...state.navigation,
            breadcrumbs: result
        }
    })
}, handler);

handler.addStateProperties('navigation');

export const connector = stateConnector(handler);

export default handler.reducer({navigation: {}});
