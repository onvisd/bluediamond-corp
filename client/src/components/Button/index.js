import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class Menu extends Component {
    static PropTypes = {
        buttonLink: PropTypes.string,
        buttonFunc: PropTypes.func,
        buttonName: PropTypes.string.isRequired,
        buttonClass: PropTypes.string.isRequired
    }

    render() {
        const {
            buttonLink,
            buttonFunc,
            buttonName,
            buttonClass
        } = this.props;

        return (
            <div className="buttonWrap">
                {buttonLink &&
                    <Link
                        to={buttonLink}
                        className={`${styles.button} ${buttonClass}`}
                    >
                        {buttonName}
                    </Link>
                }

                {buttonFunc &&
                    <Link
                        onClick={buttonFunc}
                        className={`${styles.button} ${buttonClass}`}
                    >
                        {buttonName}
                    </Link>
                }
            </div>
        );
    }
}
