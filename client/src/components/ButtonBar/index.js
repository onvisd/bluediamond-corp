import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import Button from '../Button';

import styles from './styles.module.css';

export default class ButtonBar extends Component {
    static propTypes = {
        buttons: PropTypes.arrayOf(PropTypes.shape(
            {
                text: PropTypes.string,
                link: PropTypes.string,
                style: PropTypes.string,
                visibility: PropTypes.bool
            },
            {
                text: PropTypes.string,
                link: PropTypes.string,
                style: PropTypes.string,
                visibility: PropTypes.bool
            },
            {
                text: PropTypes.string,
                link: PropTypes.string,
                style: PropTypes.string,
                visibility: PropTypes.bool
            }
        )).isRequired,
        align: PropTypes.oneOf(['left', 'center', 'right']),
        customStyle: PropTypes.object
    }

    static defaultProps = {
        align: 'center'
    }

    renderButton(button, i) {
        return (
            <Button
                key={`button${i}`}
                href={button.link}
                theme={button.style}
                className={styles.button}
            >
                {button.text}
            </Button>
        );
    }

    render() {
        const {buttons, align, customStyle} = this.props;

        return (
            <div className={classnames(styles.container, styles[align])} style={customStyle}>
                {buttons.map((button, idx) =>
                    button.visibility && this.renderButton(button, idx)
                )}
            </div>
        );
    }
}
