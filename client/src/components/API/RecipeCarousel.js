import React, {Component, PropTypes} from 'react';

import RecipeCarouselCmpt from '../RecipeCarousel';

export default class RecipeCarousel extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                carouselItems: PropTypes.array
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <RecipeCarouselCmpt
                carouselItems={fields.carouselItems}
            />
        );
    }
}
