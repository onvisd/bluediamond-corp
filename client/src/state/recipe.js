import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getRecipe = action({
    namespace: 'RECIPE',
    event: 'GET_RECIPE',
    action: (slug, search, http) =>
        http.get(`/api/recipes/${slug}?${search.replace(/^\?/, '')}`),
    result: (state, result) => ({
        ...state,
        recipe: result
    })
}, handler);

handler.addStateProperties('recipe');

export const connector = stateConnector(handler);

export default handler.reducer({recipe: {}});
