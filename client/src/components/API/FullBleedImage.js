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

        const image = assets.filter((asset) =>
            asset.sys.id === data.fields.image.sys.id)[0];

        return (
            <FullBleedImageCmpt
                title={fields.title}
                description={fields.description}
                image={image.fields.file.url}
            />
        );
    }
}
