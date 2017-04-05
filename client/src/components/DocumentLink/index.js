import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class DocumentLink extends Component {
    static propTypes = {
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string
    }

    render() {
        const {date, title, description, url} = this.props;

        return (
            <div className={styles.container}>
                <p>{date}</p>
                <p><a href={url} target="_blank">{title}</a></p>
                <p>{description}</p>
            </div>
        );
    }
}
