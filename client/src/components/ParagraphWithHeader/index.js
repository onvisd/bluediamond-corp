import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import classnames from 'classnames';

import styles from './styles.module.css';

export default class ParagraphComponent extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired,
        headerSize: PropTypes.string
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {header, paragraph, headerSize} = this.props;

        return (
            <div className={styles.container}>
                <h3 className={classnames(
                    styles.heading,
                    styles[headerSize || 'large']
                )}>{header}</h3>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={this.renderMarkup(paragraph)}
                />
            </div>
        );
    }
}
