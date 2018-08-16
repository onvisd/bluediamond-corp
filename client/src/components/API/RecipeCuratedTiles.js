import React, {Component, PropTypes} from 'react';

import RecipeTiles from '../RecipeTiles';

export default class RecipeCuratedTiles extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                tilesPerRow: PropTypes.number,
                carouselItems: PropTypes.array
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <RecipeTiles
                items={fields.carouselItems}
                tilesPerRow={fields.tilesPerRow}
            />
        );
    }
}
