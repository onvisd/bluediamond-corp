import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Tile from '../Tile';
import styles from './styles.module.css';

export default class CompanyNav extends Component {
    static propTypes = {
        onToggleNav: PropTypes.func.isRequired
    }

    render() {
        const {navTiles, navData, onToggleNav} = this.props;

        return (
            <div className={styles.container} onMouseLeave={onToggleNav}>
                <div className={styles.tiles}>
                    {navTiles.map((navTile) => (
                        <Tile key={navTile._id}>
                            <Link to={navTile.linkUrl} onClick={onToggleNav}>
                                <div>
                                    {navTile.headline}
                                    <h2 className="t--type-display-two">
                                        {navTile.title}
                                    </h2>
                                </div>
                            </Link>
                        </Tile>
                    ))}
                </div>
                <ul className={styles.companyLinks}>
                    {navData.primary.companyLinks.map((link) => {
                        let child = <Link to={link.slug} onClick={onToggleNav}>{link.name}</Link>;

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
    }
}
