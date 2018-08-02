import React, {Component, PropTypes} from 'react';

import ResponsiveHeroCmpnt from '../ResponsiveHero';

export default class ResponsiveHero extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                backgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                tabletBackgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                mobileBackgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                imageAlt: PropTypes.string,
                content: PropTypes.string,
                buttons: PropTypes.object
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
            <ResponsiveHeroCmpnt
                desktopBackgroundImage={assetsById[fields.backgroundImage.sys.id].file.url}
                tabletBackgroundImage={
                    fields.tabletBackgroundImage &&
                    assetsById[fields.tabletBackgroundImage.sys.id].file.url}
                mobileBackgroundImage={
                    fields.mobileBackgroundImage &&
                    assetsById[fields.mobileBackgroundImage.sys.id].file.url}
                imageAlt={fields.imageAlt && fields.imageAlt}
                content={fields.content && fields.content}
                buttons={fields.buttons && fields.buttons}
            />
        );
    }
}
