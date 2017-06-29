import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import styles from './styles.module.css';

const Button = (props) => {
    const {theme, layout, href, onClick, children, ...rest} = props;
    const className = classnames(
        styles[theme] || styles.primary,
        {[styles[layout]]: layout},
        rest.className
    );
    delete rest.className;

    // Render a button element
    let button = (
        <button className={className} onClick={onClick} {...rest}>
            {children}
        </button>
    );

    // If Button has an href prop, render an anchor element
    if(href) {
        button = (
            <Link className={className} to={href} onClick={onClick} {...rest}>
                {children}
            </Link>
        );
    }

    return button;
};

Button.propTypes = {
    theme: PropTypes.string,
    layout: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
};

Button.defaultProps = {
    theme: 'blueDark'
};

export default Button;
