import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getPageData = action({
    namespace: 'PAGE_DATA',
    event: 'GET_PAGE_DATA',
    action: (slug, search, http) =>
        http.get(`/api/page${slug}?${search.replace(/^\?/, '')}`),
    result: (state, result) => ({
        ...state,
        pageData: result
    })
}, handler);

handler.addStateProperties('pageData');

export const connector = stateConnector(handler);

export default handler.reducer({pageData: {}});
