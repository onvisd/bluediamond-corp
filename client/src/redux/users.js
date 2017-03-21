import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

// "Sleep" using `Promise`
const delay = (period) => new Promise((resolve) => setTimeout(resolve, period));

export const getUsers = action({
    namespace: 'USERS',
    event: 'GET_USERS',
    action: async (http) => {
        await delay(1000);
        const userIds = await http.get('/api/example/users');
        return await Promise.all(userIds.map((id) => http.get(`/api/example/users/${id}`)));
    },
    result: (state, result) => ({
        ...state,
        users: result
    })
}, handler);

handler.addStateProperties('users');

export const addUser = action({
    namespace: 'USERS',
    event: 'ADD_USER',
    action: async (user, http) => {
        await delay(1500);
        await http.post('/api/example/users', user);
    }
}, handler);

export const deleteUser = action({
    namespace: 'USERS',
    event: 'DELETE_USER',
    action: async (id, http) => {
        await delay(1000);
        await http.delete(`/api/example/users/${id}`);
    }
}, handler);

// // A developer can additionally handle any other custom events
// handler.handle('CUSTOM_EVENT', (state, action) =>
// ({
//   ...state,
//   customProperty: action.result
// }))

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler);

const initialState = {users: []};

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initialState);
