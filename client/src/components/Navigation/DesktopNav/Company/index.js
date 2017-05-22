import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Tile from '../../Tile';
import styles from './styles.module.css';

const Company = ({navData, companyNavTiles, toggleNav}) => (
    <div className={styles.container}>
        <ul className={styles.tiles}>
            {companyNavTiles.map((navTile) => (
                <Tile key={navTile._id}>
                    <p>{navTile.headline}</p>
                    <Link to={`/${navTile.linkUrl}`} onClick={toggleNav.hide}>
                        <h2>{navTile.title}</h2>
                    </Link>
                </Tile>
            ))}
        </ul>
        <ul className={styles.companyLinks}>
            {navData.primary.companyLinks.map((link) => {
                let child = <Link to={link.slug} onClick={toggleNav.hide}>{link.name}</Link>;

                if(link.external)
                    child = <a href={link.slug} target="_blank">{link.name}</a>;

                return (
                    <li className={styles.companyLink} key={link.slug}>
                        {child}
                    </li>
                );
            })}
        </ul>
    </div>
);

Company.propTypes = {
    navData: PropTypes.object.isRequired,
    companyNavTiles: PropTypes.array.isRequired,
    toggleNav: PropTypes.object.isRequired
};

export default Company;
