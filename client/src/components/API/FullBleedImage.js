import React, {Component, PropTypes} from 'react';

import FullBleedImageCmpt from '../FullBleedImage';

export default class FullBleedImage extends Component {
    static propTypes = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
                fields: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    description: PropTypes.string,
                    image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    imageTablet: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    imageMobile: PropTypes.shape({
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
                    file: PropTypes.shape({
                        url: PropTypes.string.isRequired
                    })
                })
            }))
        })
    }

    static defaultProps = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
                description: ''
            })
        })
    }

    render() {
        const {data, assets} = this.props;
        const {fields} = data;

        const assetsById = {};
        assets.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        return (
            <FullBleedImageCmpt
                title={fields.title}
                description={fields.description}
                image={assetsById[fields.image.sys.id].file.url}
                imageTablet={assetsById[fields.imageTablet.sys.id].file.url}
                imageMobile={assetsById[fields.imageMobile.sys.id].file.url}
            />
        );
    }
}
