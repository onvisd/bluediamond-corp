import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);

export const getRecipes = action({
    namespace: 'RECIPES',
    event: 'GET_RECIPES',
    action: (options, http) => {
        const {limit, search, skip, sort} = options;
        const filters = Object.assign({}, options.filters);

        Object.keys(filters).map((filterTitle) => {
            const filterValues = filters[filterTitle];
            const enabledFilters = [];

            Object.keys(filterValues).map((filter) => {
                if(filterValues[filter])
                    enabledFilters.push(encodeURIComponent(filter.replace(',', '')));
            });

            filters[filterTitle] = enabledFilters.join(',');
        });

        return http.get(`/api/recipes?${
                typeof skip === 'undefined' ? '' : `skip=${skip}`
            }${
                typeof sort === 'undefined' || sort === null
                    ? '&sort=fields.featured'
                    : `&sort=${sort}`
            }${
                typeof limit === 'undefined' ? '' : `&limit=${limit}`
            }${
                typeof search === 'undefined' || search === ''
                    ? ''
                    : `&search=${search}`
            }${
                typeof filters.breakfast === 'undefined' || filters.breakfast === ''
                    ? ''
                    : `&breakfast=${filters.breakfast}`
            }${
                typeof filters.lunchDinner === 'undefined' || filters.lunchDinner === ''
                    ? ''
                    : `&lunchDinner=${filters.lunchDinner}`
            }${
                typeof filters.desserts === 'undefined' || filters.desserts === ''
                    ? ''
                    : `&desserts=${filters.desserts}`
            }${
                typeof filters.holiday === 'undefined' || filters.holiday === ''
                    ? ''
                    : `&holiday=${filters.holiday}`
            }${
                typeof filters.easyMeals === 'undefined' || filters.easyMeals === ''
                    ? ''
                    : `&easyMeals=${filters.easyMeals}`
            }${
                typeof filters.almondBreezeFlavor === 'undefined' ||
                        filters.almondBreezeFlavor === ''
                    ? ''
                    : `&almondBreezeFlavor=${filters.almondBreezeFlavor}`
            }${
                typeof filters.dietary === 'undefined' || filters.dietary === ''
                    ? ''
                    : `&dietaryFilters=${filters.dietary}`
            }${
                typeof filters.featured === 'undefined' || filters.featured === ''
                    ? ''
                    : `&featured=${filters.featured}`
            }${
                typeof filters.ingredients === 'undefined' || filters.ingredients === ''
                    ? ''
                    : `&ingredients=${filters.ingredients}`
            }`
        );
    },
    result: (state, result) => ({
        ...state,
        recipes: result
    })
}, handler);

handler.addStateProperties('recipes');

export const connector = stateConnector(handler);

export default handler.reducer({recipes: {}});
