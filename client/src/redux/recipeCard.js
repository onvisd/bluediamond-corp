import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getRecipeCards = action({
    namespace: 'RECIPE_CARDS',
    event: 'GET_RECIPE_CARDS',
    action: (http) => http.get('/api/recipeCard'),
    result: (state, result) => ({
        ...state,
        recipeCards: result
    })
}, handler);

handler.addStateProperties('recipeCards');

export const connector = stateConnector(handler);

export default handler.reducer({recipeCards: {}});
