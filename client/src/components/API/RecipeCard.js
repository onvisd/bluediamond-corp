import React, {Component, PropTypes} from 'react';

import RecipeCardComponent from '../RecipeCard';

export default class RecipeCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            items: PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    backgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    }).isRequired,
                    description: PropTypes.string.isRequired
                })
            }),
            includes: PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string.isRequired
                }),
                fields: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    file: PropTypes.shape({
                        url: PropTypes.string
                    }).isRequired
                })
            })
        })
    }

    render() {
        const {items, includes} = this.props.data;
        const {fields} = items[0];

        return (
            <RecipeCardComponent
                title={fields.name}
                imageFile={includes.fields.file.url}
                imageAlt={includes.fields.file.name}
                description={fields.description}
            />
        );
    }
}
