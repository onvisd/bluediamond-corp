import React, {Component, PropTypes} from 'react';

import ProductImageCmpnt from '../ParagraphWithImage';

export default class ParagraphWithImage extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            items: PropTypes.shape({
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
            }),
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

        return (
            <ProductImageCmpnt
                header={fields.header}
                paragraph={fields.paragraph}
                imageFile={includes.fields.file.url}
                imageName={includes.fields.file.title}
                imageDescription={fields.description || null}
                imageAlign={fields.imagePosition || null}
            />
        );
    }
}
