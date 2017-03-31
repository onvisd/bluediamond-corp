import React, {Component, PropTypes} from 'react';

import ProductImageCmpnt from '../ParagraphWithImage';

export default class ParagraphWithImage extends Component {
    static propTypes = {
        data: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    header: PropTypes.string.isRequired,
                    paragraph: PropTypes.string.isRequired,
                    image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    }).isRequired,
                    imagePosition: PropTypes.string,
                    description: PropTypes.string
                })
            })),
            includes: PropTypes.shape({
                Asset: PropTypes.arrayOf(PropTypes.shape({
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
            })
        })
    }

    render() {
        const {items, includes} = this.props.data;
        const {fields} = items[0];

        const assetsById = {};
        includes.Asset.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        return (
            <ProductImageCmpnt
                header={fields.header}
                paragraph={fields.paragraph}
                imageFile={assetsById[fields.image.sys.id].file.url}
                imageName={assetsById[fields.image.sys.id].file.title}
                imageDescription={fields.description || null}
                imageAlign={fields.imagePosition || null}
            />
        );
    }
}
