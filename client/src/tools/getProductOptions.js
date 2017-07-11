/**
 * Returns a product options
 */
export default (card, type) => {
    let options = [];

    for (let i = 0; i < card.node.options.length; i++) {
        const option = card.node.options[i];
        const name = option.name;

        if(name === type) // get specfic options based on it's name
            options = options.concat(option.values);
    }

    return options;
};
