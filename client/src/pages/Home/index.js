import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, Link, preload} from 'react-isomorphic-render';
import classnames from 'classnames';

import {connector, getHome} from '../../redux/home';
import {parseModel} from '../../tools/parseApi';

import Button from '../../components/Button';
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

    state = {
        showDropdown: false
    }

    showDropdown = () => {
        this.setState(() => ({
            showDropdown: true
        }));
    }

    hideDropdown = () => {
        this.setState(() => ({
            showDropdown: false
        }));
    }

    render() {
        const {home} = this.props;
        const homeFields = parseModel(home)[0].fields;

        return (
            <section className={styles.container}>
                <Title>Home</Title>
                <div
                    className={styles.hero}
                    style={{backgroundImage: `url(${homeFields.heroBackground.file.url})`}}
                >
                    <img className={styles.blossom} src={homeFields.heroBlossomImage.file.url} />
                    <div
                        className={styles.products}
                        style={{backgroundImage: `url(${
                            homeFields.heroProductImage.file.url
                        })`}}
                    />
                    <div className={styles.heroContent}>
                        <h1 className="t--size-xxl">{homeFields.heroHeadline}</h1>
                        <h3>{homeFields.heroText}</h3>
                        <Button
                            onMouseOver={this.showDropdown}
                            onMouseLeave={this.hideDropdown}
                        >
                            Browse Products
                            <div className={styles.dropdown}>
                                <div className={classnames(styles.dropdownInner, {
                                    [styles.active]: this.state.showDropdown
                                })}>
                                    <ul className={styles.dropdownBrands}>
                                        <li>
                                            <Link to="/brand/snack-almonds">
                                                Snack Almonds
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/brand/almond-breeze">
                                                Almond Breeze
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/brand/nut-thins">
                                                Nut Thins
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Button>
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
                                <p>{homeFields.craftText}</p>
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
                                    backgroundImage: `url(${homeFields.historyImage.file.url})`
                                }}
                            />
                        </div>
                        <div className={styles.corpContent}>
                            <div>
                                <h1>{homeFields.historyHeadline}</h1>
                                <p>{homeFields.historyText}</p>
                                <Button href="/history" theme="green">
                                    Our History
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.coop}
                    style={{backgroundImage: `url(${homeFields.coopImage.file.url})`}}
                >
                    <div className={styles.coopContent}>
                        <div>
                            <h1 className="t--size-xxl">{homeFields.coopHeadline}</h1>
                            <p>{homeFields.coopText}</p>
                            <Button>
                                Watch Video
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
