import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import querystring from 'querystring';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const setStoreSearch = action({
    namespace: 'STORE_SEARCH',
    event: 'SET_STORE_SEARCH',
    result: 'query'
}, handler);

handler.addStateProperties('query');

export const connector = stateConnector(handler);

export const buildQueryString = (query) => {
    const qs = {
        page: query.currentPage,
        perPage: query.perPage !== 16 && query.perPage,
        productType: (query.filter || {productType: []}).productType.join('|'),
        tags: (query.filter || {tags: []}).tags.join('|'),
        options: (query.filter || {options: []}).options.join('|'),
        collections: (query.filter || {collections: []}).collections.join('|'),
        sort: query.sort,
        search: query.search
    };

    // Clean up unused keys
    Object.keys(qs).forEach((key) => {
        if(!qs[key])
            delete qs[key];
    });

    const str = querystring.stringify(qs);
    return str.length ? `?${str}` : '';
};

export default handler.reducer({query: {}});
