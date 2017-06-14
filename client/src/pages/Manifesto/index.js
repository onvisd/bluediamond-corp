import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';
import marked from 'marked';

import {connector, getManifesto} from 'state/manifesto';
import {parseModel} from 'tools/parseApi';

import PageHero from 'components/PageHero';
import ImageCluster from 'components/ImageCluster';
import FullBleedImage from 'components/FullBleedImage';
import RelatedPages from 'components/RelatedPages';
import RelatedPageLink from 'components/RelatedPageLink';

import Diamond from 'images/icons/diamond.svg';
import BgLeaves from 'images/backgrounds/almond-leaves-left.png';
import BgAlmond from 'images/backgrounds/almonds.png';

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
                <Title>Our Manifesto</Title>
                <PageHero
                    headline={manifestoFields.heroHeadline}
                    showHeadline={true}
                    buttonText={manifestoFields.heroVideoText}
                    backgroundImage={manifestoFields.heroImage.file.url}
                    video={manifestoFields.heroVideo.file.url}
                    backgroundVideo={false}
                    playVideo={true}
                />
                <div className={styles.container}>
                    <div className="l--container">
                        <div className="l--row">
                            <div
                                className="l--col-12 t--align-center"
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
                        change={false}
                    />
                    <div className="l--container">
                        <div className="l--row">
                            <div
                                className="l--col-7 t--align-center"
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
                        change={false}
                    />
                    <div className="l--container">
                        <div className="l--row">
                            <div
                                className="l--col-7 t--align-center"
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
                        headline="We take pride in our work"
                        title="Perfected Over Generations"
                        linkText="Learn about our history"
                        linkUrl="/history"
                        linkTheme="green"
                        backgroundImage={BgLeaves}
                    />
                    <RelatedPageLink
                        headline="Craft section headline"
                        title="Our Almonds are our story"
                        linkText="Learn about our craft"
                        linkUrl="/craft"
                        linkTheme="yellow"
                        backgroundImage={BgAlmond}
                    />
                </RelatedPages>
            </section>
        );
    }
}
