import React, {Component, PropTypes} from 'react';

import RelatedPageLinkCmpt from '../RelatedPageLink';

export default class RelatedPageLink extends Component {
    static propTypes = {
        linkId: PropTypes.string.isRequired,
        entries: PropTypes.arrayOf(PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                headline: PropTypes.string,
                title: PropTypes.string,
                linkText: PropTypes.string,
                linkUrl: PropTypes.string,
                linkTheme: PropTypes.string,
                backgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string
                    })
                })
            })
        })),
        assets: PropTypes.arrayOf(PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string
            }),
            fields: PropTypes.shape({
                file: PropTypes.shape({
                    url: PropTypes.string
                })
            })
        }))
    }

    static defaultProps = {
        entries: PropTypes.arrayOf(PropTypes.shape({
            fields: PropTypes.shape({
                headline: '',
                title: '',
                linkText: '',
                linkUrl: '',
                linkTheme: '',
                backgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: ''
                    })
                })
            })
        })),
        assets: PropTypes.arrayOf(PropTypes.shape({
            sys: PropTypes.shape({
                id: ''
            }),
            fields: PropTypes.shape({
                file: PropTypes.shape({
                    url: ''
                })
            })
        }))
    }

    render() {
        const {linkId, entries, assets} = this.props;

        const data = entries.filter((entry) =>
            entry.sys.id === linkId
        )[0];

        let image = null;
        if(data.fields.backgroundImage) {
            image = assets.filter((asset) =>
            asset.sys.id === data.fields.backgroundImage.sys.id)[0];
        }

        return (
            <RelatedPageLinkCmpt
                headline={data.fields.headline}
                title={data.fields.title}
                linkText={data.fields.linkText}
                linkUrl={data.fields.linkUrl}
                linkTheme={data.fields.linkTheme}
                backgroundImage={image && image.fields.file.url}
            />
        );
    }
}
