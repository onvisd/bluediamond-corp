/**
 * Modifies Contentful images based on options passed in. Based on the API:
 * https://www.contentful.com/developers/docs/references/images-api
 *
 * Valid options:

 * @param {Object[]} employees - The employees who are responsible for the project.
* @param {string} employees[].name - The name of an employee.
* @param {string} employees[].department - The employee's department.

 * @param {Object} options - Configuration options for how the image will be output
 * @param {number} options.width - Width, in pixels
 * @param {number} options.height - Height, in pixels
 * @param {string} options.format - Format; valid: jpg, png, webp
 * @param {number} options.quality - Quality (for JPGs only); between 0 and 100
 * @param {boolean} options.progressive - Make progressive (for JPGs only)
 * @param {string} options.fit - How to resize the image; valid: pad, crop, fill, thumb, scale
 * @param {string} options.focus - Area of focus when `thumb` fit type; see options in API docs
 * @param {number} options.radius - Float value defining the corner radius
 * @param {string} options.background - Background color to use when `pad` fit type
 */
export default (src, options) => {
    const query = [];

    if(options.width)
        query.push(`w=${options.width}`);

    if(options.height)
        query.push(`h=${options.height}`);

    if(options.format)
        query.push(`fmt=${options.format}`);

    if(options.quality)
        query.push(`q=${options.quality}`);

    if(options.progressive)
        query.push('fl=progressive');

    if(options.fit)
        query.push(`fit=${options.fit}`);

    if(options.focus)
        query.push(`f=${options.focus}`);

    if(options.radius)
        query.push(`r=${options.radius}`);

    if(options.background)
        query.push(`bg=${options.background}`);

    return `${src}?${query.join('&')}`;
};
