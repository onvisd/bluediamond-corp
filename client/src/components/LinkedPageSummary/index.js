import React, {Component, PropTypes} from 'react';
import marked from 'marked';

import styles from './styles.module.css';

export default class LinkedPageSummary extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired
    };

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {
            title,
            url,
            summary
        } = this.props;

        return (
            <section className={styles.container}>
                <a href={url} className={styles.content}>
                    <h2 className="t--size-xl">{title}</h2>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={this.renderMarkup(summary)}
                    />
                </a>
            </section>
        );
    }
}
