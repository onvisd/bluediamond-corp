import {action, createHandler, stateConnector} from 'react-isomorphic-render';
import settings from '../react-isomorphic-render-async';

const handler = createHandler(settings);


const linkedIngredients = {
    Unsweetened: '4lKxznSz0AAIIawoAMAEom',
    Original: '3R7n111GvCSgasUC4igQqU',
    Vanilla: '2JgXvUAUco228KK6cSAEkC',
    Chocolate: '4YEDOuG6FqySao8M0ewg6s',
    'Hint of Honey': '6CTkYGSxd6UM66ueAwwGm0'
};

export const getRecipes = action({
    namespace: 'RECIPES',
    event: 'GET_RECIPES',
    action: (options, http) => {
        const {limit, search, skip, sort} = options;
        const filters = Object.assign({}, options.filters);

        Object.keys(filters).map(function(filterTitle) {
            const filterValues = filters[filterTitle];

            const enabledFilters = [];
            Object.keys(filterValues).map(function(filter) {
                if(filterValues[filter]) {
                    if(filterTitle === 'almondBreezeFlavor')
                        filter = linkedIngredients[filter];

                    enabledFilters.push(encodeURIComponent(filter.replace(',', '')));
                }
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
                typeof search === 'undefined' ? '' : `&search=${search}`
            }${
                typeof filters.category === 'undefined' || filters.category === ''
                    ? ''
                    : `&category=${filters.category}`
            }${
                typeof filters.seasonal === 'undefined' || filters.seasonal === ''
                    ? ''
                    : `&seasonal=${filters.seasonal}`
            }${
                typeof filters.dietary === 'undefined' || filters.dietary === ''
                    ? ''
                    : `&dietaryFilters=${filters.dietary}`
            }${
                typeof filters.almondBreezeFlavor === 'undefined' ||
                        filters.almondBreezeFlavor === ''
                    ? ''
                    : `&almondBreezeFlavor=${filters.almondBreezeFlavor}`
            }${
                typeof filters.featured === 'undefined' || filters.featured === ''
                    ? ''
                    : `&featuredIn=${filters.featured}`
            }${
                typeof filters.difficulty === 'undefined' || filters.difficulty === ''
                    ? ''
                    : `&difficulty=${filters.difficulty}`
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
