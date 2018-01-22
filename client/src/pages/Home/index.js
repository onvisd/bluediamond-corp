import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import {Parallax} from 'react-parallax';
import {Track, TrackDocument} from 'react-track';
import {tween} from 'react-imation';
import {topTop, calculateScrollY} from 'react-track/tracking-formulas';
import {translate3d, percent} from 'react-imation/tween-value-factories';

import {connector, getHome} from 'state/home';
import {parseModel} from 'tools/parseApi';
import image from 'tools/image';

import Title from 'components/Title';
import Button from 'components/Button';
import ButtonDropdown from 'components/ButtonDropdown';
import preventOrphan from 'tools/preventOrphan';
import styles from './styles.module.css';

@preload(({dispatch}) => dispatch(getHome()))
@connect(
    (state) => ({
        responsive: state.responsive,
        ...connector(state.home)
    }),
    {getHome}
)
export default class Home extends Component {
    static propTypes = {
        home: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    heroHeadline: PropTypes.string.isRequired,
                    heroText: PropTypes.string.isRequired,
                    heroBackground: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    heroBlossomImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    heroProductImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    craftHeadline: PropTypes.string.isRequired,
                    craftText: PropTypes.string.isRequired,
                    craftImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    historyHeadline: PropTypes.string.isRequired,
                    historyText: PropTypes.string.isRequired,
                    historyImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    coopHeadline: PropTypes.string.isRequired,
                    coopText: PropTypes.string.isRequired,
                    coopImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })
                })
            })),
            includes: PropTypes.shape({
                Entry: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                })),
                Asset: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }))
            })
        })
    }

    dropdownButtonClick(evt, name) {
        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'navigation',
                action: 'click',
                label: name
            });
        }
    }

    trackDocument(children) {
        return (
            <TrackDocument formulas={[
                calculateScrollY, topTop
            ]}>
                {(scrollY, topTop) => // eslint-disable-line no-shadow
                    children(scrollY, topTop)}
            </TrackDocument>
        );
    }

    render() {
        const {home, responsive} = this.props;
        const homeFields = parseModel(home)[0].fields;

        const heroBackground = image(
            homeFields.heroBackground.file.url,
            {
                format: 'jpg',
                quality: 70,
                progressive: true,
                width: 1000
            }
        );

        return this.trackDocument((scrollY, topTop) => ( // eslint-disable-line no-shadow
            <section className={styles.container}>
                <Title>From Our Hearts to Your Hands</Title>
                <div
                    className={styles.heroWrapper}
                >
                    <div
                        className={styles.hero}
                    >
                        <Parallax
                            className={styles.heroBackground}
                            bgImage={heroBackground}
                            strength={200}
                        />
                        <div className={styles.contentWrap}>
                            <img
                                className={styles.blossom}
                                src={homeFields.heroBlossomImage.file.url}
                                alt="Blossom"
                            />
                            <div className={styles.heroContent}>
                                <h1 className="t--size-xxl">
                                    {preventOrphan(homeFields.heroHeadline)}
                                </h1>
                                <h3>{preventOrphan(homeFields.heroText)}</h3>
                                <ButtonDropdown
                                    items={[
                                        {slug: '/brand/snack-almonds', name: 'Snack Almonds'},
                                        {slug: '/brand/almond-breeze', name: 'Almond Breeze'},
                                        {slug: '/brand/nut-thins', name: 'Nut-Thins'}
                                    ]}
                                    onClick={this.dropdownButtonClick}
                                    layout="large"
                                >
                                    Browse Products
                                </ButtonDropdown>
                            </div>
                        </div>
                        <div
                            className={styles.products}
                            style={{backgroundImage: `url(${
                                homeFields.heroProductImage.file.url
                            })`}}
                        />
                    </div>
                </div>
                <div className={styles.corporate}>
                    <Track
                        className={styles.craft}
                        formulas={[topTop]}
                    >
                    {(Div, posTopTop) => (
                        <Div>
                            <div
                                className={styles.frame}
                                style={
                                    responsive.large
                                    ? tween(scrollY, [
                                        [posTopTop * 0.1, {
                                            transform: translate3d(percent(-15), 70, 0)
                                        }],
                                        [posTopTop - 200, {
                                            transform: translate3d(percent(-15), 0, 0)
                                        }]
                                    ])
                                    : null
                                }
                            >
                                <div
                                    className={styles.image}
                                    style={{
                                        backgroundImage: `url(${image(
                                            homeFields.craftImage.file.url,
                                            {
                                                format: 'jpg',
                                                quality: 70,
                                                progressive: true
                                            }
                                        )})`
                                    }}
                                />
                            </div>
                            <div className={styles.corpContent}>
                                <div>
                                    <h1>{homeFields.craftHeadline}</h1>
                                    <p>{preventOrphan(homeFields.craftText)}</p>
                                    <Button href="/craft" theme="yellow">
                                        Our Craft
                                    </Button>
                                </div>
                            </div>
                        </Div>
                    )}
                    </Track>
                    <Track
                        className={styles.history}
                        formulas={[topTop]}
                    >
                    {(Div, posTopTop) => (
                        <Div>
                            <div
                                className={styles.frame}
                                style={
                                    responsive.large
                                    ? tween(scrollY, [
                                        [posTopTop * 0.2, {
                                            transform: translate3d(percent(15), 50, 0)
                                        }],
                                        [posTopTop - 200, {
                                            transform: translate3d(percent(15), -20, 0)
                                        }]
                                    ])
                                    : null
                                }
                            >
                                <div
                                    className={styles.image}
                                    style={{
                                        backgroundImage:
                                            `url(${image(
                                                homeFields.historyImage.file.url,
                                                {
                                                    format: 'jpg',
                                                    quality: 70,
                                                    progressive: true
                                                }
                                            )})`
                                    }}
                                />
                            </div>
                            <div className={styles.corpContent}>
                                <div>
                                    <h1>{homeFields.historyHeadline}</h1>
                                    <p>{preventOrphan(homeFields.historyText)}</p>
                                    <Button href="/history" theme="green">
                                        Our History
                                    </Button>
                                </div>
                            </div>
                        </Div>
                    )}
                    </Track>
                </div>
                <Parallax
                    className={styles.coop}
                    bgImage={image(
                        homeFields.coopImage.file.url,
                        {
                            format: 'jpg',
                            quality: 70,
                            progressive: true,
                            width: responsive.xlarge ? 1920 : 1440
                        }
                    )}
                >
                    <div className={styles.coopContent}>
                        <h2>{preventOrphan(homeFields.coopHeadline)}</h2>
                        <p>{preventOrphan(homeFields.coopText)}</p>
                        <Button href="/manifesto">
                            Our Story
                        </Button>
                    </div>
                </Parallax>
            </section>
        ));
    }
}
