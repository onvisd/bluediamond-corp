import React, {Component, PropTypes} from 'react';

import DocumentLinkCmpnt from '../DocumentLInk';

export default class DocumentLink extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                date: PropTypes.string.isRequired,
                linkTitle: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                linkUrl: PropTypes.string.isRequired,
                linkMedia: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                })
            })
        }),
        assets: PropTypes.arrayOf(PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                title: PropTypes.string.isRequired,
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
            <DocumentLinkCmpnt
                date={fields.date}
                title={fields.linkTitle}
                description={fields.description}
                url={fields.linkUrl || assetsById[fields.image.sys.id].file.url || null}
            />
        );
    }
}
