import React, {Component, PropTypes} from 'react';
import Button from '../Button';
import styles from './styles.module.css';

export default class RelatedPageLink extends Component {
    static propTypes = {
        headline: PropTypes.string,
        title: PropTypes.string.isRequired,
        linkText: PropTypes.string.isRequired,
        linkUrl: PropTypes.string.isRequired,
        linkTheme: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string
    }

    static defaultProps = {
        backgroundImage: ''
    }

    render() {
        const {
            title,
            linkText,
            linkUrl,
            linkTheme,
            backgroundImage
        } = this.props;

        const style = {
            backgroundImage: `url(${backgroundImage})`
        };

        return (
            <div className={styles.container} style={style}>
                <div style={{width: '100%'}}>
                    <h1>{title}</h1>
                    <Button href={linkUrl} theme={linkTheme}>
                        {linkText}
                    </Button>
                </div>
            </div>
        );
    }
}
