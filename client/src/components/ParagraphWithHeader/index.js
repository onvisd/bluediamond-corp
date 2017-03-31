import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class ParagraphComponent extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired
    }

    renderMarkup(field) {
        return {__html: field};
    }

    render() {
        const {header, paragraph} = this.props;

        return (
            <div className={styles.container}>
                <h3>{header}</h3>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={this.renderMarkup(paragraph)}
                />
            </div>
        );
    }
}
