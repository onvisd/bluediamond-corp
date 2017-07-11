/**
 * @param {Object} query
 */

import {browserHistory} from 'react-router';

export default (...queryNames) => {
    const location = Object.assign({}, browserHistory.getCurrentLocation());
    queryNames.forEach((q) => delete location.query[q]);
    browserHistory.push(location);
};
