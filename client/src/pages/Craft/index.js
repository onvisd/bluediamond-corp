import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getCraft} from '../../redux/craft';
import {parseModel} from '../../tools/parseApi';

import GenericHero from '../../components/GenericHero';
import RelatedPages from '../../components/RelatedPages';
import RelatedPageLink from '../../components/RelatedPageLink';
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
                    innovationOneBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    innovationOneTitle: PropTypes.string.isRequired,
                    innovationOneText: PropTypes.string.isRequired,
                    innovationTwoBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    innovationTwoTitle: PropTypes.string.isRequired,
                    innovationTwoText: PropTypes.string.isRequired,
                    factsHeadline: PropTypes.string.isRequired,
                    factsBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
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

    render() {
        const {craft} = this.props;
        const craftFields = parseModel(craft)[0].fields;

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
                        backgroundImage: `
                        linear-gradient(
                            to top,
                            rgba(255, 255, 255, 1) 0%,
                            rgba(255, 255, 255, 0.9) 40%,
                            rgba(255, 255, 255, 0) 80%
                        ),
                        url(${
                            craftFields.detailsBackgroundImage.file.url
                        })`
                    }}
                >
                    <div className={styles.detailsContainer}>
                        <h1>{craftFields.detailsHeadline}</h1>
                        <ul className={styles.detailColumns}>
                            <li className={styles.detail}>
                                <h3>{craftFields.detailOneTitle}</h3>
                                <p>{craftFields.detailOneText}</p>
                            </li>
                            <li className={styles.detail}>
                                <h3>{craftFields.detailTwoTitle}</h3>
                                <p>{craftFields.detailTwoText}</p>
                            </li>
                            <li className={styles.detail}>
                                <h3>{craftFields.detailThreeTitle}</h3>
                                <p>{craftFields.detailThreeText}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.innovationBlue}>
                    <div className={styles.container}>
                        <h2>Innovation</h2>
                        <div className={styles.innovationContent}>
                            <h3>{craftFields.innovationOneTitle}</h3>
                            <p className="t--type-prose">{craftFields.innovationOneText}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.innovationYellow}>
                    <div className={styles.container}>
                        <div className={styles.innovationContent}>
                            <h3>{craftFields.innovationTwoTitle}</h3>
                            <p className="t--type-prose">{craftFields.innovationTwoText}</p>
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
                        <h2>Almond Facts</h2>
                        <p className="t--type-prose">{craftFields.factsHeadline}</p>
                        <div className={styles.hotspot} style={{top: '20%', left: '40%'}}>
                            <span>+</span>
                            <div className={styles.hotspotContentR}>
                                <h3>{craftFields.factOneTitle}</h3>
                                <p className="t--type-prose">{craftFields.factOneText}</p>
                            </div>
                        </div>
                        <div className={styles.hotspot} style={{top: '50%', left: '0'}}>
                            <span>+</span>
                            <div className={styles.hotspotContentR}>
                                <h3>{craftFields.factTwoTitle}</h3>
                                <p className="t--type-prose">{craftFields.factTwoText}</p>
                            </div>
                        </div>
                        <div className={styles.hotspot} style={{top: '70%', left: '80%'}}>
                            <span>+</span>
                            <div className={styles.hotspotContentL}>
                                <h3>{craftFields.factThreeTitle}</h3>
                                <p className="t--type-prose">{craftFields.factThreeText}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <RelatedPages>
                    <RelatedPageLink
                        title="Perfected Over Generations"
                        linkText="Our history"
                        linkUrl="/history"
                        linkTheme="green"
                    />
                    <RelatedPageLink
                        title="Quality is our legacy"
                        linkText="Read our Manifesto"
                        linkUrl="/manifesto"
                        linkTheme="blue"
                    />
                </RelatedPages>
            </section>
        );
    }
}
