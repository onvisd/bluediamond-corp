import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getStoreReviews = action({
    namespace: 'REVIEWS',
    event: 'GET_REVIEWS',
    action: (config, http) => {
        const {slug, id, page} = config;
        return http.get(`/api/store/product/${slug}/reviews?id=${id}&page=${page || 1}`)
            .then((result) => result)
            .catch((err) => console.log(err));
    },
    result: (state, result) => ({
        ...state,
        productReviews: result
    })
}, handler);

handler.addStateProperties('productReviews');

export const connector = stateConnector(handler);

export default handler.reducer({productReviews: {}});
