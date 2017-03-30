import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class Paragraph extends Component {
    static propTypes: {
        content: PropTypes.string.isRequired
    }

    renderMarkup(data) {
        return {__html: data};
    }

    render() {
        const {content} = this.props;

        return (
            <div className={styles.container}>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={this.renderMarkup(content)}
                />
            </div>
        );
    }
}
