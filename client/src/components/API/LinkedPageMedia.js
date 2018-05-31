import React, {Component, PropTypes} from 'react';

import LinkedPageMediaCmpnt from '../LinkedPageMedia';

export default class LinkedPageMedia extends Component {
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
                description: PropTypes.string
            })
        }),
        theme: PropTypes.oneOf(['default', 'dark', 'crave'])
    }

    render() {
        const {fields} = this.props.data;

        return (
            <LinkedPageMediaCmpnt
                header={fields.header}
                paragraph={fields.paragraph}
                imageFile={fields.image ? fields.image.fields.file.url : null}
                video={fields.video || null}
                mediaAlign={fields.mediaPosition || null}
                buttonText={fields.buttonText || null}
                buttonLink={fields.buttonLink || null}
                buttonStyle={fields.buttonStyle || null}
                theme={this.props.theme}
            />
        );
    }
}
