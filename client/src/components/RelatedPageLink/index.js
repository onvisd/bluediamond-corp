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
            headline,
            title,
            linkText,
            linkUrl,
            linkTheme,
            backgroundImage
        } = this.props;

        return (
            <div className={styles.container} style={backgroundImage && {backgroundImage: `url(${backgroundImage})`}}>
                <div style={{width: '100%'}}>
                    {headline && <h4>{headline}</h4>}
                    <h1 className="t--type-display-two">{title}</h1>
                    <Button href={linkUrl} theme={linkTheme}>
                        {linkText}
                    </Button>
                </div>
            </div>
        );
    }
}
