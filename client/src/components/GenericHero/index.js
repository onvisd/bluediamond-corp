import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Parallax} from 'react-parallax';

import Button from '../Button';
import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive,
    })
)
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
            className,
            responsive
        } = this.props;

        const alignClass = `align${verticalAlign}`;

        return (
            <div
                className={classNames(
                    styles.container,
                    verticalAlign ? styles[alignClass] : styles.alignBottom,
                    className
                )}
            >
                <Parallax
                    className={styles.background}
                    bgImage={backgroundImage}
                    strength={responsive.small ? 0 : 200}
                />
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
