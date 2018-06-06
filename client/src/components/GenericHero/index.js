import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Parallax} from 'react-parallax';

import ButtonBar from '../ButtonBar';
import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class GenericHero extends Component {
    static propTypes = {
        headline: PropTypes.string,
        title: PropTypes.string,
        titleSize: PropTypes.string,
        color: PropTypes.string,
        verticalAlign: PropTypes.string,
        mobileVerticalAlign: PropTypes.string,
        horizontalAlign: PropTypes.string,
        mobileHorizontalAlign: PropTypes.string,
        buttonOneText: PropTypes.string,
        buttonOneLink: PropTypes.string,
        buttonOneStyle: PropTypes.string,
        buttonTwoText: PropTypes.string,
        buttonTwoLink: PropTypes.string,
        buttonTwoStyle: PropTypes.string,
        backgroundImage: PropTypes.string.isRequired,
        backgroundAlign: PropTypes.string,
        mobileBackground: PropTypes.string,
        pageClass: PropTypes.string, // used for static pages only
        parallax: PropTypes.bool,
        className: PropTypes.any
    }

    static defaultProps = {
        titleSize: 'xxl',
        color: 'light',
        verticalAlign: 'Bottom',
        horizontalAlign: 'Left',
        mobileVerticalAlign: 'Bottom',
        mobileHorizontalAlign: 'Left',
        parallax: true
    }

    render() {
        const {
            headline,
            title,
            titleSize,
            color,
            verticalAlign,
            mobileVerticalAlign,
            horizontalAlign,
            mobileHorizontalAlign,
            buttonOneText,
            buttonOneLink,
            buttonOneStyle,
            buttonTwoText,
            buttonTwoLink,
            buttonTwoStyle,
            backgroundImage,
            backgroundAlign,
            mobileBackground,
            parallax,
            className,
            responsive
        } = this.props;

        const vAlignClass = `vAlign${verticalAlign}`;
        const hAlignClass = `hAlign${horizontalAlign}`;
        const mvAlignClass = `mvAlign${mobileVerticalAlign}`;
        const mhAlignClass = `mhAlign${mobileHorizontalAlign}`;

        return (
            <div
                className={classNames(
                    styles.container,
                    verticalAlign ? styles[vAlignClass] : styles.vAlignBottom,
                    horizontalAlign ? styles[hAlignClass] : styles.hAlignCenter,
                    mobileVerticalAlign ? styles[mvAlignClass] : styles.mvAlignBottom,
                    mobileHorizontalAlign ? styles[mhAlignClass] : styles.mhAlignCenter,
                    className,
                    styles[color]
                )}
            >
                {parallax ? (
                    <Parallax
                        className={styles.background}
                        bgImage={backgroundImage}
                        strength={responsive.small ? 0 : 200}
                    />
                ) : (
                    <div
                        className={styles.background}
                        style={{
                            backgroundImage: `url(${
                                (responsive.xsmall && mobileBackground)
                                    ? mobileBackground
                                    : backgroundImage
                            })`,
                            backgroundSize: 'cover',
                            backgroundPosition: `center ${
                                responsive.xsmall ? 'center' : backgroundAlign
                            }`
                        }}
                    />
                )}
                <div className={styles.innerContainer}>
                    {headline && <h3>{headline}</h3>}
                    {title && <h1 className={`t--size-${titleSize}`}>{title}</h1>}
                    {(buttonOneText || buttonTwoText) && (
                        <ButtonBar
                            align={horizontalAlign && horizontalAlign.toLowerCase()}
                            buttons={[
                                {
                                    text: buttonOneText,
                                    link: buttonOneLink,
                                    style: buttonOneStyle,
                                    visibility: Boolean(buttonOneText)
                                },
                                {
                                    text: buttonTwoText,
                                    link: buttonTwoLink,
                                    style: buttonTwoStyle,
                                    visibility: Boolean(buttonTwoText)
                                }
                            ]}
                        />
                    )}
                </div>
            </div>
        );
    }
}
