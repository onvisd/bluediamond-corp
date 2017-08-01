import React, {Component, PropTypes} from 'react';

import Card from '../Card';

export default class RecipeCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    cookTime: PropTypes.number.isRequired,
                    slug: PropTypes.string.isRequired,
                    difficulty: PropTypes.string.isRequired,
                    dietaryRestrictions: PropTypes.array,
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

        let image = '';
        if(assetsById[fields.cardBackgroundImage.sys.id])
            image = assetsById[fields.cardBackgroundImage.sys.id].file.url;

        return (
            <Card
                imageUrl={image}
                linkTo={{url: `/recipes/${fields.slug}`}}
                type="recipes"
            >
                <h3>{fields.name}</h3>
                <p>{fields.cookTime} minutes <span>|</span> {fields.difficulty}</p>
            </Card>
        );
    }
}
