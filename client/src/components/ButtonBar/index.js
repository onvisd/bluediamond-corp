import React, {Component, PropTypes} from 'react';

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
        )).isRequired
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
        const {buttons} = this.props;

        return (
            <div className={styles.container}>
                {buttons.map((button, idx) =>
                    button.visibility && this.renderButton(button, idx)
                )}
            </div>
        );
    }
}
