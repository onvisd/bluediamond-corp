import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import classnames from 'classnames';

import styles from './styles.module.css';

export default class RecallAlertBar extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        visible: PropTypes.bool,
        location: PropTypes.object
    };

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {
            content,
            visible,
            location
        } = this.props;

        const isStore = location.pathname.includes('store');

        if(visible) {
            return (
                <section className={classnames(styles.container, isStore && styles.store)}>
                      <div
                          className={styles.content}
                          dangerouslySetInnerHTML={this.renderMarkup(content)}
                      />
                </section>
            );
        }

        return null;
    }
}
