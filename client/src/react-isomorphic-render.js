import persistState from 'redux-localstorage';
import routes from './routes';
import * as reducer from './state/reducer';
import wrapper from './wrapper';
import asyncSettings from './react-isomorphic-render-async';

// "Favicon" must be imported on the client side too
// since no assets are emitted on the server side
// export {default as icon} from '../assets/images/icon.png';

const enhancers = [];
if(typeof localStorage !== 'undefined')
    enhancers.push(persistState('checkout'));

export default {
    reducer,
    routes,
    wrapper,

    reduxStoreEnhancers: () => enhancers,

    preload: {
        catch(error, {url, redirect}) {
            switch (error.status) {
                case 404:
                    return redirect('/404');

                default:
                    console.error(`Error while preloading "${url}"`);
                    console.error(error);

                    if(process.env.NODE_ENV === 'production')
                        redirect('/error');
                    else
                        throw error;
            }

            // // Not authenticated
            // if (error.status === 401)
            // {
            // 	return redirect('/unauthenticated')
            // }

            // // Not authorized
            // if (error.status === 403)
            // {
            // 	return redirect('/unauthorized')
            // }
        }
    },

    ...asyncSettings
};
