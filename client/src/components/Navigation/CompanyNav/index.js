import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Tile from '../Tile';
import styles from './styles.module.css';

export default class CompanyNav extends Component {
    static propTypes = {
        onToggleNav: PropTypes.func.isRequired
    }

    render() {
        const {navTiles, navData} = this.props;

        return (
            <div className={styles.container} onMouseLeave={this.props.onToggleNav}>
                <div className={styles.tiles}>
                    {navTiles.map((navTile) => (
                        <Tile key={navTile.slug}>
                            <Link to={navTile.slug}>
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
                        let child = <Link to={link.slug}>{link.name}</Link>;

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
