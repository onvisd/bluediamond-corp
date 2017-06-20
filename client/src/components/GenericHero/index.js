import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import Button from '../Button';
import styles from './styles.module.css';

export default class GenericHero extends Component {
    static propTypes = {
        headline: PropTypes.string,
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        ctaText: PropTypes.string,
        ctaUrl: PropTypes.string,
        ctaTheme: PropTypes.string,
        verticalAlign: PropTypes.string,
        backgroundImage: PropTypes.string.isRequired,
        pageClass: PropTypes.string, // used for static pages only
        className: PropTypes.any
    }

    static defaultProps = {
        color: 'light'
    }

    render() {
        const {
            headline,
            title,
            color,
            ctaText,
            ctaUrl,
            ctaTheme,
            verticalAlign,
            backgroundImage,
            className
        } = this.props;

        const alignClass = `align${verticalAlign}`;

        return (
            <div
                className={classNames(
                    styles.container,
                    verticalAlign ? styles[alignClass] : styles.alignBottom,
                    className
                )}
                style={{backgroundImage: `url(${backgroundImage})`}}
            >
                <div className={`${styles.innerContainer} ${styles[color]}`}>
                    {headline && <h3>{headline}</h3>}
                    <h1 className="t--size-xxl">{title}</h1>
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
