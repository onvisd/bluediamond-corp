import React, {Component, PropTypes} from 'react';

import RecipeCardComponent from '../RecipeCard';

export default class RecipeCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
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
        })
    }

    render() {
        const {entry, assets} = this.props.data;
        const {fields} = entry;

        const assetsById = {};
        assets.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        return (
            <RecipeCardComponent
                title={fields.name}
                cookTime={fields.cookTime}
                recipe={fields.slug}
                difficulty={fields.difficulty}
                imageFile={assetsById[fields.cardBackgroundImage.sys.id].file.url}
            />
        );
    }
}
