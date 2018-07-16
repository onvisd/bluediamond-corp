import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import {ViewPager, Frame, Track as PagerTrack, View} from 'react-view-pager';
import classnames from 'classnames';
import {Track, TrackDocument} from 'react-track';
import {tween} from 'react-imation';
import {topTop, calculateScrollY} from 'react-track/tracking-formulas';
import {translate3d} from 'react-imation/tween-value-factories';
import {Parallax} from 'react-parallax';
import Helmet from 'react-helmet';

import {connector, getCraft} from 'state/craft';
import {parseModel} from 'tools/parseApi';

import Title from 'components/Title';
import Meta from 'components/Meta';

import BDLogo from 'images/bd-logo.png';
import GrowersHands from 'images/icons/growers-hands.svg';
import ProductManufacturing from 'images/icons/product-manufacturing.svg';
import QualityAssurance from 'images/icons/quality-assurance.svg';
import Blossom from 'images/relatedLinks/blossom-on-right.png';
import Leaves from 'images/relatedLinks/leaf-on-left.png';
import GenericHero from 'components/GenericHero';
import RelatedPages from 'components/RelatedPages';
import RelatedPageLink from 'components/RelatedPageLink';
import styles from './styles.module.css';


@preload(({dispatch, location}) => dispatch(getCraft(location.search)))
@connect(
    (state) => ({
        responsive: state.responsive,
        ...connector(state.craft)
    }),
    {getCraft}
)
export default class Craft extends Component {
    static propTypes = {
        craft: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    heroHeadline: PropTypes.string.isRequired,
                    heroTitle: PropTypes.string.isRequired,
                    heroImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    detailsHeadline: PropTypes.string.isRequired,
                    detailsBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    detailOneTitle: PropTypes.string.isRequired,
                    detailOneText: PropTypes.string.isRequired,
                    detailTwoTitle: PropTypes.string.isRequired,
                    detailTwoText: PropTypes.string.isRequired,
                    detailThreeTitle: PropTypes.string.isRequired,
                    detailThreeText: PropTypes.string.isRequired,
                    innovationBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    innovationTitle: PropTypes.string.isRequired,
                    innovationText: PropTypes.string.isRequired,
                    factsBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    factsTitle: PropTypes.string.isRequired,
                    factsHeadline: PropTypes.string.isRequired,
                    factOneTitle: PropTypes.string,
                    factOneText: PropTypes.string,
                    factTwoTitle: PropTypes.string,
                    factTwoText: PropTypes.string,
                    factThreeTitle: PropTypes.string,
                    factThreeText: PropTypes.string
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

    state = {
        activeTab: 0,
        activeHotspot: null
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeTab: currentIndices[0]
        }));
    }

    handleHotspotClick = (hotspot) => {
        if(this.props.responsive.large)
            this.setState({activeHotspot: hotspot});
    }

    hideHotspots = (evt) => {
        if(this.props.responsive.large && !evt.target.closest(`.${styles.hotspot}`))
            this.setState({activeHotspot: null});
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
        const {activeTab} = this.state;
        const {craft} = this.props;
        const craftFields = parseModel(craft)[0].fields;
        const hotspots = [
            {
                title: craftFields.factOneTitle,
                text: craftFields.factOneText,
                coords: {x: 40, y: 30}
            },
            {
                title: craftFields.factTwoTitle,
                text: craftFields.factTwoText,
                coords: {x: 1, y: 50}
            },
            {
                title: craftFields.factThreeTitle,
                text: craftFields.factThreeText,
                coords: {x: 80, y: 70}
            }
        ];

        return this.trackDocument((scrollY, topTop) => ( // eslint-disable-line no-shadow
            <section className="content">
                <Title>Our Craft</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: 'Our Craft'
                    },
                    {
                        property: 'og:description',
                        content: craftFields.heroTitle
                    },
                    {
                        property: 'og:image',
                        content: craftFields.heroImage.file.url
                    },
                    {
                        name: 'description',
                        content: craftFields.heroTitle
                    }
                ]}</Meta>
                <Helmet>
                    <link rel="canonical" href={`https://www.bluediamond.com${this.props.location.pathname}`} />
                </Helmet>
                <GenericHero
                    headline={craftFields.heroHeadline}
                    title={craftFields.heroTitle}
                    color="dark"
                    verticalAlign="Bottom"
                    backgroundImage={craftFields.heroImage.file.url}
                />
                <Track
                    className={styles.details}
                    style={{
                        backgroundImage: `url(${
                            craftFields.detailsBackgroundImage.file.url
                        })`
                    }}
                    formulas={[topTop]}
                >
                    {(Div, posTopTop) => (
                        <Div>
                            <div className={styles.detailsOverlay} />
                            <div className={styles.detailsContainer}>
                                <div>
                                    <img src={BDLogo} className={styles.logo} alt="Logo" />
                                    <h2>{craftFields.detailsHeadline}</h2>
                                </div>
                                <ul className={styles.detailColumns}>
                                    <li
                                        className={styles.detail}
                                        style={
                                            tween(scrollY, [
                                                [posTopTop - 200, {
                                                    opacity: 0,
                                                    transform: translate3d(0, 150, 0)
                                                }],
                                                [posTopTop, {
                                                    opacity: 1,
                                                    transform: translate3d(0, 0, 0)
                                                }]
                                            ])
                                        }
                                    >
                                        <GrowersHands />
                                        <h3>{craftFields.detailOneTitle}</h3>
                                        <p>{craftFields.detailOneText}</p>
                                    </li>
                                    <li
                                        className={styles.detail}
                                        style={
                                            tween(scrollY, [
                                                [posTopTop - 150, {
                                                    opacity: 0,
                                                    transform: translate3d(0, 150, 0)
                                                }],
                                                [posTopTop, {
                                                    opacity: 1,
                                                    transform: translate3d(0, 0, 0)
                                                }]
                                            ])
                                        }
                                    >
                                        <ProductManufacturing />
                                        <h3>{craftFields.detailTwoTitle}</h3>
                                        <p>{craftFields.detailTwoText}</p>
                                    </li>
                                    <li
                                        className={styles.detail}
                                        style={
                                            tween(scrollY, [
                                                [posTopTop - 100, {
                                                    opacity: 0,
                                                    transform: translate3d(0, 150, 0)
                                                }],
                                                [posTopTop, {
                                                    opacity: 1,
                                                    transform: translate3d(0, 0, 0)
                                                }]
                                            ])
                                        }
                                    >
                                        <QualityAssurance />
                                        <h3>{craftFields.detailThreeTitle}</h3>
                                        <p>{craftFields.detailThreeText}</p>
                                    </li>
                                </ul>
                            </div>
                        </Div>
                    )}
                </Track>
                <div
                    className={styles.innovation}
                    style={{
                        backgroundImage: `url(${
                            craftFields.innovationBackgroundImage.file.url
                        })`
                    }}
                >
                    <div className={styles.innovationOverlay} />
                    <div className={styles.container}>
                        <div className={styles.innovationContent}>
                            <h2>{craftFields.innovationTitle}</h2>
                            <p>{craftFields.innovationText}</p>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.facts}
                >
                    <Parallax
                        className={styles.background}
                        bgImage={craftFields.factsBackgroundImage.file.url}
                        strength={100}
                    />
                    <div className={styles.container} onClick={this.hideHotspots}>
                        <h2>{craftFields.factsTitle}</h2>
                        <p className={styles.factsHeadline}>{craftFields.factsHeadline}</p>
                        <div className={styles.hotspots}>
                            {hotspots.map((hotspot, idx) => (
                                <div
                                    className={classnames(styles.hotspot, {
                                        [styles.isActive]: this.state.activeHotspot === idx
                                    })}
                                    key={`${hotspot.coords.y}${hotspot.coords.x}`}
                                    style={{
                                        top: `${hotspot.coords.y}%`,
                                        left: `${hotspot.coords.x}%`
                                    }}
                                    onClick={() => this.handleHotspotClick(idx)}
                                >
                                    <span>+</span>
                                    <div
                                        className={styles[`hotspotContent${
                                            hotspot.coords.x > 50 ? 'L' : 'R'
                                        }`]}
                                    >
                                        <h3>{hotspot.title}</h3>
                                        <p>{hotspot.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ViewPager className={styles.hotspotsMobile}>
                            <Frame>
                                <PagerTrack
                                    viewsToShow={1}
                                    infinite
                                    onViewChange={this.handleSwipe}
                                    style={{display: 'flex'}}
                                    ref={(track) => {
                                        this.carouselTrack = track;
                                    }}
                                >
                                    {hotspots.map((hotspot, idx) => (
                                        <View style={{flex: '1'}} key={`hotspot-${idx}`}>
                                            <div className={styles.hotspotContent}>
                                                <h3>{hotspot.title}</h3>
                                                <p>{hotspot.text}</p>
                                            </div>
                                        </View>
                                    ))}
                                </PagerTrack>
                            </Frame>
                        </ViewPager>
                        <div className={styles.tabs}>
                            {hotspots.map((hotspot, idx) => (
                                <div
                                    key={`hotspot-${idx}`}
                                    className={classnames(styles.tab, {
                                        [styles.tabActive]: activeTab === idx
                                    })}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <RelatedPages>
                    <RelatedPageLink
                        title="Perfected Over Generations"
                        linkText="Our History"
                        linkUrl="/history"
                        linkTheme="green"
                        backgroundImage={Leaves}
                    />
                    <RelatedPageLink
                        title="Quality is Our Legacy"
                        linkText="Our Story"
                        linkUrl="/manifesto"
                        linkTheme="blue"
                        backgroundImage={Blossom}
                    />
                </RelatedPages>
            </section>
        ));
    }
}
