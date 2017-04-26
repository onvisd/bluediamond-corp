import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import styles from './styles.module.css';

const Breadcrumbs = ({crumbs}) => (
    <nav className={styles.container}>
        <ul className={styles.innerContainer}>
            {crumbs.map((crumb, idx) => {
                if(idx === (crumbs.length - 1)) {
                    return (
                        <span className={styles.crumb} key={`crumb${idx}`}>
                            {crumb.name}
                        </span>
                    );
                }

                return (
                    <Link
                        to={crumb.path}
                        className={styles.crumbLink}
                        key={`crumb${idx}`}
                    >
                        {crumb.name}
                    </Link>
                );
            })}
        </ul>
    </nav>
);

Breadcrumbs.propTypes = {
    crumbs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }))
};

export default Breadcrumbs;
