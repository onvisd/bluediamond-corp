import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getFoodService = action({
    namespace: 'FOOD_SERVICE',
    event: 'GET_FOOD_SERVICE',
    action: (search, http) =>
        http.get(`/api/template/foodService?${search.replace(/^\?/, '')}`),
    result: (state, result) => ({
        ...state,
        foodService: result
    })
}, handler);

handler.addStateProperties('foodService');

export const connector = stateConnector(handler);

export default handler.reducer({foodService: {}});
