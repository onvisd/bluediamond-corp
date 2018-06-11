import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getRecipeFilters = action({
    namespace: 'RECIPE_FILTERS',
    event: 'GET_RECIPE_FILTERS',
    action: (search, http) =>
        http.get(`/api/recipe/filters?${search.replace(/^\?/, '')}`),
    result: (state, result) => ({
        ...state,
        recipeFilters: result
    })
}, handler);

handler.addStateProperties('recipeFilters');

export const connector = stateConnector(handler);

export default handler.reducer({recipeFilters: {}});
