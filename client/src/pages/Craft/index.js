import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';

import {connector, getCraft} from 'state/craft';
import {parseModel} from 'tools/parseApi';

import Title from 'components/Title';

import BDLogo from 'images/bd-logo.svg';
import GrowersHands from 'images/icons/growers-hands.svg';
import ProductManufacturing from 'images/icons/product-manufacturing.svg';
import QualityAssurance from 'images/icons/quality-assurance.svg';
import GenericHero from 'components/GenericHero';
import RelatedPages from 'components/RelatedPages';
import RelatedPageLink from 'components/RelatedPageLink';
import styles from './styles.module.css';


@preload(({dispatch}) => dispatch(getCraft()))
@connect(
    (state) => ({...connector(state.craft)}),
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
        activeTab: 0
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeTab: currentIndices[0]
        }));
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
                coords: {x: 0, y: 50}
            },
            {
                title: craftFields.factThreeTitle,
                text: craftFields.factThreeText,
                coords: {x: 80, y: 70}
            }
        ];

        return (
            <section className="content">
                <Title>Our Craft</Title>
                <GenericHero
                    headline={craftFields.heroHeadline}
                    title={craftFields.heroTitle}
                    color="dark"
                    verticalAlign="Bottom"
                    backgroundImage={craftFields.heroImage.file.url}
                />
                <div
                    className={styles.details}
                    style={{
                        backgroundImage: `url(${
                            craftFields.detailsBackgroundImage.file.url
                        })`
                    }}
                >
                    <div className={styles.detailsOverlay} />
                    <div className={styles.detailsContainer}>
                        <div>
                            <BDLogo />
                            <h2>{craftFields.detailsHeadline}</h2>
                        </div>
                        <ul className={styles.detailColumns}>
                            <li className={styles.detail}>
                                <GrowersHands />
                                <h3>{craftFields.detailOneTitle}</h3>
                                <p>{craftFields.detailOneText}</p>
                            </li>
                            <li className={styles.detail}>
                                <ProductManufacturing />
                                <h3>{craftFields.detailTwoTitle}</h3>
                                <p>{craftFields.detailTwoText}</p>
                            </li>
                            <li className={styles.detail}>
                                <QualityAssurance />
                                <h3>{craftFields.detailThreeTitle}</h3>
                                <p>{craftFields.detailThreeText}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    className={styles.innovation}
                    style={{
                        backgroundImage: `url(${craftFields.innovationBackgroundImage.file.url})`
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
                    style={{
                        backgroundImage: `url(${craftFields.factsBackgroundImage.file.url})`
                    }}
                >
                    <div className={styles.container}>
                        <h2>{craftFields.factsTitle}</h2>
                        <p className={styles.factsHeadline}>{craftFields.factsHeadline}</p>
                        <div className={styles.hotspots}>
                            {hotspots.map((hotspot) => (
                                <div
                                    className={styles.hotspot}
                                    key={`${hotspot.coords.y}${hotspot.coords.x}`}
                                    style={{
                                        top: `${hotspot.coords.y}%`,
                                        left: `${hotspot.coords.x}%`
                                    }}
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
                                <Track
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
                                </Track>
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
                    />
                    <RelatedPageLink
                        title="Quality is our legacy"
                        linkText="Our Story"
                        linkUrl="/manifesto"
                        linkTheme="blue"
                    />
                </RelatedPages>
            </section>
        );
    }
}
