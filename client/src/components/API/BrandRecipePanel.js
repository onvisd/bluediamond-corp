import React, {Component, PropTypes} from 'react';

import BrandRecipePanelCmpt from '../BrandRecipePanel';

export default class BrandRecipePanel extends Component {
    static propTypes = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
                fields: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    linkText: PropTypes.string.isRequired,
                    linkUrl: PropTypes.string.isRequired
                })
            }),
            recipes: PropTypes.arrayOf(PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string.isRequired
                }),
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    cookTime: PropTypes.number.isRequired,
                    slug: PropTypes.string.isRequired,
                    difficulty: PropTypes.string.isRequired,
                    cardBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })
                }),
                assets: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    }),
                    fields: PropTypes.shape({
                        file: PropTypes.shape({
                            url: PropTypes.string.isRequired
                        })
                    })
                }))
            }))
        })
    }

    render() {
        const {entry, recipes} = this.props.data;
        const {fields} = entry;

        return (
            <BrandRecipePanelCmpt
                title={fields.title}
                description={fields.description}
                linkText={fields.linkText}
                linkUrl={fields.linkUrl}
                recipes={recipes}
            />
        );
    }
}
