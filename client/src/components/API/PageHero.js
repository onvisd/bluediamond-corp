import React, {Component, PropTypes} from 'react';

import PageHeroCmpnt from '../PageHero';

export default class PageHero extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                headline: PropTypes.string.isRequired,
                showHeadline: PropTypes.bool.isRequired,
                content: PropTypes.string.isRequired,
                buttonText: PropTypes.string.isRequired,
                buttonLink: PropTypes.string.isRequired,
                backgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                videoFile: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                playVideoInBackground: PropTypes.bool.isRequired,
                showVideoPlayIcon: PropTypes.bool.isRequired
            })
        }),
        assets: PropTypes.arrayOf(PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                file: PropTypes.shape({
                    url: PropTypes.string
                }).isRequired
            })
        }))
    }

    render() {
        const {assets} = this.props;
        const {fields} = this.props.data;

        const assetsById = {};
        assets.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        return (
            <PageHeroCmpnt
                headline={fields.headline}
                showHeadline={fields.showHeadline}
                content={fields.content || null}
                buttonText={fields.buttonText || null}
                buttonLink={fields.buttonLink || null}
                backgroundImage={assetsById[fields.backgroundImage.sys.id].file.url}
                video={assetsById[fields.videoFile.sys.id].file.url || null}
                backgroundVideo={fields.playVideoInBackground}
                playVideo={fields.showVideoPlayIcon}
            />
        );
    }
}
