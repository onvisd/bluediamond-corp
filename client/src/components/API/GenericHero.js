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
                title: PropTypes.string,
                titleSize: PropTypes.string,
                textColor: PropTypes.string,
                verticalAlignment: PropTypes.string,
                mobileVerticalAlignment: PropTypes.string,
                horizontalAlignment: PropTypes.string,
                mobileHorizontalAligment: PropTypes.string,
                backgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                backgroundHorizontalAlignment: PropTypes.string,
                mobileBackgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                buttonOneText: PropTypes.string,
                buttonOneLink: PropTypes.string,
                buttonOneStyle: PropTypes.string,
                buttonTwoText: PropTypes.string,
                buttonTwoLink: PropTypes.string,
                buttonTwoStyle: PropTypes.string
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
                title: '',
                titleSize: 'xxl',
                textColor: 'dark',
                verticalAlignment: 'center',
                horizontalAlignment: 'center',
                backgroundHorizontalAlignment: 'center',
                buttonOneText: '',
                buttonOneLink: '',
                buttonOneStyle: '',
                buttonTwoText: '',
                buttonTwoLink: '',
                buttonTwoStyle: ''
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
                titleSize={fields.titleSize}
                color={fields.textColor}
                verticalAlign={fields.verticalAlignment}
                mobileVerticalAlign={fields.mobileVerticalAlignment}
                mobileHorizontalAlign={fields.mobileHorizontalAlignment}
                horizontalAlign={fields.horizontalAlignment}
                backgroundImage={assetsById[fields.backgroundImage.sys.id].file.url}
                backgroundAlign={fields.backgroundHorizontalAlignment}
                mobileBackground={
                    fields.mobileBackgroundImage &&
                    assetsById[fields.mobileBackgroundImage.sys.id].file.url
                }
                buttonOneText={fields.buttonOneText}
                buttonOneLink={fields.buttonOneLink}
                buttonOneStyle={fields.buttonOneStyle}
                buttonTwoText={fields.buttonTwoText}
                buttonTwoLink={fields.buttonTwoLink}
                buttonTwoStyle={fields.buttonTwoStyle}
                parallax={false}
            />
        );
    }
}
