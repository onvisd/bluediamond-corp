import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import env from 'tools/env';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getStoreProducts = action({
    namespace: 'STORE',
    event: 'GET_PRODUCTS',
    action: (filter, search, sort, page, http) => {
        const params = Object.keys(filter).map(function(key) {
            if(filter[key] && filter[key].length > 0)
                return `${key}=${filter[key].join('|')}`;

            return '';
        }).filter((param) => param.length > 0);

        params.push(`page=${page || 0}`);

        if(sort)
            params.push(`sort=${sort}`);
        if(search)
            params.push(`search=${search}`);
        if(env.development)
            params.push(`${Date.now()}`);

        let query = '';
        if(params.length > 0)
            query = `?${params.join('&')}`;

        return http.get(
            `/api/store/products${query}`)
            .then((result) => result)
            .catch((err) => console.log(err));
    },
    result: (state, result) => {
        const currentProducts = state.products;

        // append the previous results if it isn't the first page
        if(result.nextPage > 1 && currentProducts.products) {
            result.products.unshift(...currentProducts.products);
            result.images = {...result.images, ...currentProducts.images};
        }

        return {
            ...state,
            products: result
        };
    }
}, handler);

handler.addStateProperties('products');

export const connector = stateConnector(handler);

export default handler.reducer({products: {}});
