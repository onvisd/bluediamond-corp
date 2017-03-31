import React, {Component, PropTypes} from 'react';

import RecipeHeadComponent from '../RecipeHead';

export default class RecipeHead extends Component {
    static propTypes = {
        data: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    heroImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    }).isRequired,
                    ingredients: PropTypes.array.isRequired,
                    nutrition: PropTypes.string.isRequired,
                    steps: PropTypes.array.isRequired
                })
            })),
            includes: PropTypes.shape({
                Asset: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    }),
                    fields: PropTypes.shape({
                        title: PropTypes.string.isRequired,
                        file: PropTypes.shape({
                            url: PropTypes.string
                        }).isRequired
                    })
                }))
            })
        })
    }

    render() {
        const {items, includes} = this.props.data;
        const {fields} = items[0];

        const assetsById = {};
        includes.Asset.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        return (
            <RecipeHeadComponent
                title={fields.name}
                heroImage={assetsById[fields.heroImage.sys.id].file.url}
                ingredients={fields.ingredients}
                nutrition={fields.nutrition}
                steps={fields.steps}
            />
        );
    }
}
