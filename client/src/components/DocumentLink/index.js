import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class DocumentLink extends Component {
    static propTypes = {
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        textUrl: PropTypes.string.isRequired,
        mediaUrl: PropTypes.string.isRequired
    }

    render() {
        const {date, title, description, textUrl, mediaUrl} = this.props;

        return (
            <div className={styles.container}>
                <p>{date}</p>
                {textUrl || mediaUrl
                    ? <p><a href={textUrl || mediaUrl} target="_blank">{title}</a></p>
                    : <p>{title}</p>
                }
                {description && <p>{description}</p>}
            </div>
        );
    }
}
