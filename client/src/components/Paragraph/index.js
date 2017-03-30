import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class Paragraph extends Component {
    static propTypes: {
        header: PropTypes.string,
        content: PropTypes.string.isRequired
    }

    render() {
        const {header, content} = this.props;

        return (
            <div className={styles.container}>
                {header &&
                    <div className={styles.heading}>
                        <h2>{header}</h2>
                    </div>
                }
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={this.renderMarkup(content)}
                />
            </div>
        );
    }

    renderMarkup(data) {
        return {__html: data};
    }
}
