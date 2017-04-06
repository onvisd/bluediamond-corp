import React, {Component, PropTypes} from 'react';

import RecipeCardComponent from '../RecipeCard';

export default class RecipeCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    backgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    description: PropTypes.string.isRequired
                })
            }),
            assets: PropTypes.arrayOf(PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string.isRequired
                }),
                fields: PropTypes.shape({
                    title: PropTypes.string.isRequired,
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

        const image = assets.filter((asset) =>
            asset.sys.id === entry.fields.backgroundImage.sys.id)[0];

        return (
            <RecipeCardComponent
                title={fields.name}
                imageFile={image.fields.file.url}
                imageAlt={image.fields.title}
                description={fields.description}
            />
        );
    }
}
