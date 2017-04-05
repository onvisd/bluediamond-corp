import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

const Button = (props) => {
    const {appearance, href, onClick, children, ...rest} = props;
    const className = `${
        appearance.className ||
        styles[appearance.theme] ||
        styles.default
    } ${styles[appearance.layout] || ''}`;

    // Render a button element
    let button = (
        <button
            className={className}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );

    // If Button has an href prop, render an anchor element
    if(href) {
        button = (
            <Link
                className={className}
                to={href}
                {...rest}
            >
                {children}
            </Link>
        );
    }

    return button;
};

Button.propTypes = {
    appearance: PropTypes.shape({
        className: PropTypes.string,
        theme: PropTypes.string,
        layout: PropTypes.string
    }),
    href: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.string.isRequired
};

Button.defaultProps = {
    appearance: {
        theme: 'primary',
        layout: 'medium'
    }
};

export default Button;
