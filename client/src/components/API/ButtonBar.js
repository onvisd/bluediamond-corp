import React, {Component, PropTypes} from 'react';

import ButtonBarComponent from '../ButtonBar';

export default class ButtonBar extends Component {
    static propTypes = {
        data: PropTypes.shape({
            fields: PropTypes.shape({
                buttonOneText: PropTypes.string.isRequired,
                buttonOneLink: PropTypes.string.isRequired,
                buttonOneStyle: PropTypes.string.isRequired,
                showButtonOne: PropTypes.bool.isRequired,
                buttonTwoText: PropTypes.string,
                buttonTwoLink: PropTypes.string,
                buttonTwoStyle: PropTypes.string,
                showButtonTwo: PropTypes.bool,
                buttonThreeText: PropTypes.string,
                buttonThreeLink: PropTypes.string,
                buttonThreeStyle: PropTypes.string,
                showButtonThree: PropTypes.bool
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <ButtonBarComponent
                buttons={[
                    {
                        text: fields.buttonOneText,
                        link: fields.buttonOneLink,
                        style: fields.buttonOneStyle,
                        visibility: fields.showButtonOne
                    },
                    {
                        text: fields.buttonTwoText || null,
                        link: fields.buttonTwoLink || null,
                        style: fields.buttonTwoStyle || null,
                        visibility: fields.showButtonTwo || null
                    },
                    {
                        text: fields.buttonThreeText || null,
                        link: fields.buttonThreeLink || null,
                        style: fields.buttonThreeStyle || null,
                        visibility: fields.showButtonThree || null
                    }
                ]}
            />
        );
    }
}
