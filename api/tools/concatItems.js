/**
 * Pushes items into a single array & removes duplicates
 */
export default (list, key) => {
    if(key) {
        return list.filter((elem, index, self) => // eslint-disable-line no-shadow
            index === self.findIndex((el) => el[key] === elem[key])
        );
    }

    const concated = [].concat(...list);
    return [...new Set(concated)];
};
