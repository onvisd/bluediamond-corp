export default (a, b) => {
    const aPriority = a.fields.priority || 100000;
    const bPriority = b.fields.priority || 100000;

    if(aPriority > bPriority)
        return 1;

    if(aPriority < bPriority)
        return -1;

    return 0;
};
