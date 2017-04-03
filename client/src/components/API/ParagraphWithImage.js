import React, {Component, PropTypes} from 'react';

import ParagraphImageCmpnt from '../ParagraphWithImage';

export default class ParagraphWithImage extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                header: PropTypes.string.isRequired,
                paragraph: PropTypes.string.isRequired,
                image: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                imagePosition: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired
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
            <ParagraphImageCmpnt
                header={fields.header}
                paragraph={fields.paragraph}
                imageFile={assetsById[fields.image.sys.id].file.url}
                imageName={assetsById[fields.image.sys.id].title}
                imageDescription={fields.description || null}
                imageAlign={fields.imagePosition || null}
            />
        );
    }
}
