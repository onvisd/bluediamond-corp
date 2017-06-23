/**
 * Returns a 'slugified' string with only alphanumerics and dashes
 */
export default (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-{2,}/g, '-');
