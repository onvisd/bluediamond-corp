/**
 * @param {Object} query
 */

import {browserHistory} from 'react-router';

export default (query) => {
    const location = Object.assign({}, browserHistory.getCurrentLocation());
    Object.assign(location.query, query);
    browserHistory.push(location);
};
