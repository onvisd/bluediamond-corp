export default (str) => {
    str = str.split(' ');
    return `${str.slice(0, str.length - 2).join(' ')} ${str.slice(-2).join('\u00A0')}`; // &nbsp;
};
