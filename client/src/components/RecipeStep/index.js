import React, {Component, PropTypes} from 'react';
import marked from 'marked';

import styles from './styles.module.css';

export default class RecipeStep extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        directions: PropTypes.string.isRequired
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {title, directions} = this.props;

        return (
            <li>
                <h4>{title}</h4>
                <p dangerouslySetInnerHTML={this.renderMarkup(directions)}></p>
            </li>
        );
    }
}
