/**
 * Pushes items into object if they are an array
 */
export default (item, list) => {
    if(Array.isArray(item) || typeof item === 'string')
        return list.push(item);
};
