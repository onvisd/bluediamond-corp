import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getStoreFilters = action({
    namespace: 'STORE',
    event: 'GET_FILTERS',

    action: (filter, search, http) => {
        const params = Object.keys(filter).map(function(key) {
            if(filter[key] && filter[key].length > 0)
                return `${key}=${filter[key].join('|')}`;

            return '';
        }).filter((param) => param.length > 0);

        if(search)
            params.push(`search=${search}`);

        let query = '';
        if(params.length > 0)
            query = `?${params.join('&')}`;

        return http.get(`/api/store/filters${query}`)
            .then((result) => result)
            .catch((err) => console.log(err));
    },
    result: (state, result) => ({
        ...state,
        filters: result
    })
}, handler);

handler.addStateProperties('filters');

export const connector = stateConnector(handler);

export default handler.reducer({filters: {}});
