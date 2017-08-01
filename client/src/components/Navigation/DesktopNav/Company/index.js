import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Tile from 'components/Navigation/Tile';
import sortByPriority from 'tools/sortByPriority';
import styles from './styles.module.css';

const Company = ({company, toggleNav}) => {
    const tiles = company.filter((item) => item.fields.isTile).sort(sortByPriority);
    const links = company.filter((item) => !item.fields.isTile).sort(sortByPriority);

    return (
        <div className={styles.container}>
            <ul className={styles.tiles}>
                {tiles.map((navTile) => (
                    <Tile
                        key={navTile.sys.id}
                        bgImage={navTile.fields.backgroundImage.fields.file.url}
                        to={navTile.fields.url}
                        onClick={toggleNav.hide}
                    >
                        <p>{navTile.fields.linkSecondaryText}</p>
                        <h2>{navTile.fields.linkText}</h2>
                    </Tile>
                ))}
            </ul>
            <ul className={styles.companyLinks}>
                {links.map((item) => {
                    let child = (
                        <Link to={item.fields.url} onClick={toggleNav.hide}>
                            {item.fields.linkText}
                        </Link>
                    );

                    if(item.fields.url.match('://') || item.fields.url.match('mailto:')) {
                        child = (
                            <a href={item.fields.url} target="_blank">{item.fields.linkText}</a>
                        );
                    }

                    return (
                        <li className={styles.companyLink} key={item.fields.linkText}>
                            {child}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

Company.propTypes = {
    navData: PropTypes.object.isRequired,
    company: PropTypes.array.isRequired,
    toggleNav: PropTypes.object.isRequired
};

export default Company;
