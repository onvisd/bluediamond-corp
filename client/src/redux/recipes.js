import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getRecipes = action({
    namespace: 'RECIPES',
    event: 'GET_RECIPES',
    action: (http) => http.get('/api/recipes'),
    result: (state, result) => ({
        ...state,
        recipes: result
    })
}, handler);

handler.addStateProperties('recipes');

export const connector = stateConnector(handler);

export default handler.reducer({recipes: {}});
