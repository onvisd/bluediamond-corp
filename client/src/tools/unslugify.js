/**
 * Returns an 'unslugified' string with only alphanumerics and spaces
 */
  export default (str) => {
      const toUpperCase = str.charAt(0).toUpperCase();
      const toCapsCase = str.slice(1).toLowerCase();
      const newStr = (match, group1) => ` ${group1.toUpperCase()}`;
      const replace = toCapsCase.replace(/[-|_](.)/g, newStr);
      return `${toUpperCase}${replace}`;
  };
