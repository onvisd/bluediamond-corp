export default (a, b) => {
    if(a.fields.priority > b.fields.priority)
        return 1;

    if(a.fields.priority < b.fields.priority)
        return -1;

    return 0;
};
