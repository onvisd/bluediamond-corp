import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import {Parallax} from 'react-parallax';

import {connector, getHome} from 'state/home';
import {parseModel} from 'tools/parseApi';

import Title from 'components/Title';
import Button from 'components/Button';
import ButtonDropdown from 'components/ButtonDropdown';
import preventOrphan from 'tools/preventOrphan';
import styles from './styles.module.css';

@preload(({dispatch}) => dispatch(getHome()))
@connect(
    (state) => ({...connector(state.home)}),
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

    render() {
        const {home} = this.props;
        const homeFields = parseModel(home)[0].fields;

        return (
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
                            bgImage={homeFields.heroBackground.file.url}
                            strength={200}
                        />
                        <div className={styles.contentWrap}>
                            <img
                                className={styles.blossom}
                                src={homeFields.heroBlossomImage.file.url}
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
                    <div className={styles.craft}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{backgroundImage: `url(${homeFields.craftImage.file.url})`}}
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
                    </div>
                    <div className={styles.history}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage:
                                        `url(${homeFields.historyImage.file.url})`
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
                    </div>
                </div>
                <Parallax
                    className={styles.coop}
                    bgImage={homeFields.coopImage.file.url}
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
        );
    }
}
