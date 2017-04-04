import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class Button extends Component {
    static PropTypes = {
        link: PropTypes.string,
        func: PropTypes.func,
        name: PropTypes.string,
        style: PropTypes.string
    }

    render() {
        const {link, func, name, style} = this.props;

        return (
            <div className={styles.container}>
                <Link
                    to={link}
                    onClick={func}
                    name={name}
                    className={`${styles.button} ${style}`}
                >
                    {this.props.children}
                </Link>
            </div>
        );
    }
}
