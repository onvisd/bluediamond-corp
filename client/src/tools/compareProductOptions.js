/**
 * Compares & returns product options
 */
const escapeRegEx = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

export default (arr, index) => {
    if(!arr || !arr.length)
        return false;

    let match = false;

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].match(escapeRegEx(index)))
            match = true;
    }

    return match;
};
