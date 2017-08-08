import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import env from 'tools/env';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getRecipes = action({
    namespace: 'RECIPES',
    event: 'GET_RECIPES',
    action: (skip, http) =>
        http.get(`/api/recipes/${skip}${env.development ? `?${Date.now()}` : ''}`),
    result: (state, result) => ({
        ...state,
        recipes: result
    })
}, handler);

handler.addStateProperties('recipes');

export const connector = stateConnector(handler);

export default handler.reducer({recipes: {}});
