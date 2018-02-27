/**
 * Splits page query & filters out given paramater(s)
 */

import unslugify from './unslugify';

export default (filterType, query) => {
    const arr = Object.keys(query).map((q) => Object.assign(
      {filter: q},
      {via: query[q]}
    ));

    const filter = [];
    for (let i = 0; i < arr.length; i++) {
        const via = arr[i].via;
        const filters = via.split('|');
        if(arr[i].filter === filterType) {
            for (let f = 0; f < filters.length; f++)
                filter.push(unslugify(filters[f]).toLowerCase());
        }
    }

    return filter;
};
