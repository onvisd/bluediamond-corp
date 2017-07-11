/**
 * Splits page query & filters out given paramater(s)
 */
export default (filterType, query) => {
    const arr = Object.keys(query).map((q) => Object.assign(
      {filter: q},
      {via: query[q]}
    ));

    let filter = '';
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].filter === filterType)
            filter = arr[i].via;
    }

    return filter;
};
