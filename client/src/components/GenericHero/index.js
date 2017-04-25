import React, {Component, PropTypes} from 'react';

import Button from '../Button';
import styles from './styles.module.css';

export default class GenericHero extends Component {
    static propTypes = {
        headline: PropTypes.string,
        title: PropTypes.string.isRequired,
        ctaText: PropTypes.string,
        ctaUrl: PropTypes.string,
        ctaTheme: PropTypes.string,
        verticalAlign: PropTypes.string,
        backgroundImage: PropTypes.string.isRequired
    }

    render() {
        const {
            headline,
            title,
            ctaText,
            ctaUrl,
            ctaTheme,
            verticalAlign,
            backgroundImage
        } = this.props;

        const alignClass = `align${verticalAlign}`;

        return (
            <div className={`${styles.container} ${verticalAlign ? styles[alignClass] : styles.alignBottom}`} style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className={styles.innerContainer}>
                    {headline && <h3>{headline}</h3>}
                    <h1 className="t--type-display-one">{title}</h1>
                    {ctaText && ctaUrl && ctaTheme && (
                        <Button href={ctaUrl} theme={ctaTheme}>
                            {ctaText}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}
