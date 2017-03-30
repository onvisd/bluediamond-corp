import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class Paragraph extends Component {
    static propTypes: {
        header: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }

    render() {
        const {header, content} = this.props;

        return (
            <div className={styles.paragraphComponent}>
                {header && this.renderHeader(header)}
                {this.renderContent(content)}
            </div>
        );
    }

    renderHeader(data)	{
        return (
            <h2>{data}</h2>
        );
    }

    renderContent(data)	{
        return (
            <p>{data}</p>
        );
    }
}
