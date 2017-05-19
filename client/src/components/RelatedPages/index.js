import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class RelatedPages extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        const {children} = this.props;

        return (
            <div className={styles.container}>
                {children}
                <div className={styles.seperator} />
            </div>
        );
    }
}
