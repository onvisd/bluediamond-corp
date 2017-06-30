import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import marked from 'marked';
import classnames from 'classnames';

import {connector, getManifesto} from 'state/manifesto';
import {parseModel} from 'tools/parseApi';

import Title from 'components/Title';
import GenericHero from 'components/GenericHero';
import ImageCluster from 'components/ImageCluster';
import FullBleedImage from 'components/FullBleedImage';
import RelatedPages from 'components/RelatedPages';
import RelatedPageLink from 'components/RelatedPageLink';

import Diamond from 'images/icons/diamond.svg';
import BgLeaves from 'images/relatedLinks/leaf-on-left.png';
import BgAlmond from 'images/relatedLinks/almonds-on-right.png';

import styles from './styles.module.css';

@preload(({dispatch}) => dispatch(getManifesto()))
@connect(
    (state) => ({...connector(state.manifesto)}),
    {getManifesto}
)
export default class Manifesto extends Component {
    static propTypes = {
        manifesto: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    heroHeadline: PropTypes.string.isRequired,
                    heroVideoText: PropTypes.string.isRequired,
                    heroImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    heroVideo: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    introHeadline: PropTypes.string.isRequired,
                    firstImageCluster: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })),
                    firstContentBlock: PropTypes.string.isRequired,
                    secondImageCluster: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })),
                    secondContentBlock: PropTypes.string.isRequired,
                    fullBleedImage: PropTypes.shape({
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

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {manifesto} = this.props;
        const manifestoFields = parseModel(manifesto)[0].fields;

        return (
            <section className={styles.content}>
                <Title>Our Story</Title>
                <GenericHero
                    className={styles.hero}
                    headline="Our Story"
                    title={manifestoFields.heroHeadline}
                    backgroundImage={manifestoFields.heroImage.file.url}
                />
                <div className={styles.container}>
                    <div className="l--container">
                        <div className="l--row">
                            <div
                                className={`t--align-center ${styles.headline}`}
                                dangerouslySetInnerHTML={this.renderMarkup(
                                    manifestoFields.introHeadline
                                )}
                            />
                        </div>
                    </div>
                    <ImageCluster
                        images={[
                            {
                                url: manifestoFields.firstImageCluster[0].file.url
                            },
                            {
                                url: manifestoFields.firstImageCluster[1].file.url
                            }
                        ]}
                        className={styles.imageCluster}
                        change={false}
                    />
                    <div className="l--container">
                        <div className="l--row">
                            <div
                                className={`t--align-center ${styles.contentBlock}`}
                                dangerouslySetInnerHTML={this.renderMarkup(
                                    manifestoFields.firstContentBlock
                                )}
                            />
                        </div>
                    </div>
                    <ImageCluster
                        images={[
                            {
                                url: manifestoFields.secondImageCluster[0].file.url
                            },
                            {
                                url: manifestoFields.secondImageCluster[1].file.url
                            },
                            {
                                url: manifestoFields.secondImageCluster[2].file.url
                            }
                        ]}
                        className={classnames(styles.imageCluster, styles.secondImageCluster)}
                        change={false}
                    />
                    <div className="l--container">
                        <div className="l--row">
                            <div
                                className={`t--align-center ${styles.contentBlock}`}
                                dangerouslySetInnerHTML={this.renderMarkup(
                                    manifestoFields.secondContentBlock
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.diamond}>
                    <Diamond />
                </div>
                <FullBleedImage
                    image={manifestoFields.fullBleedImage.file.url}
                />
                <RelatedPages>
                    <RelatedPageLink
                        title="Perfected Over Generations"
                        linkText="Our History"
                        linkUrl="/history"
                        linkTheme="green"
                        backgroundImage={BgLeaves}
                    />
                    <RelatedPageLink
                        title="Almonds Are All We Do"
                        linkText="Our Craft"
                        linkUrl="/craft"
                        linkTheme="yellow"
                        backgroundImage={BgAlmond}
                    />
                </RelatedPages>
            </section>
        );
    }
}
