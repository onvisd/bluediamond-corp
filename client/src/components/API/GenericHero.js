import React, {Component, PropTypes} from 'react';

import GenericHeroCmpnt from '../GenericHero';

export default class GenericHero extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                headline: PropTypes.string,
                title: PropTypes.string.isRequired,
                ctaText: PropTypes.string,
                ctaUrl: PropTypes.string,
                ctaTheme: PropTypes.string,
                verticalAlignment: PropTypes.string,
                backgroundImage: PropTypes.shape({
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
                    url: PropTypes.string
                }).isRequired
            })
        }))
    }

    static defaultProps = {
        data: PropTypes.shape({
            fields: PropTypes.shape({
                headline: '',
                ctaText: '',
                ctaUrl: '',
                ctaTheme: '',
                verticalAlignment: ''
            })
        })
    }

    render() {
        const {assets} = this.props;
        const {fields} = this.props.data;

        const assetsById = {};
        assets.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        return (
            <GenericHeroCmpnt
                headline={fields.headline}
                title={fields.title}
                ctaText={fields.ctaText}
                ctaUrl={fields.ctaUrl}
                ctaTheme={fields.ctaTheme}
                verticalAlign={fields.verticalAlignment}
                backgroundImage={assetsById[fields.backgroundImage.sys.id].file.url}
            />
        );
    }
}
