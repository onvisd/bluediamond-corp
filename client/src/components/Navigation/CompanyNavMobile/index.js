import React, {Component} from 'react';
import {Link} from 'react-isomorphic-render';

import Breadcrumb from '../Breadcrumb';
import Tile from '../Tile';
import View from '../View';
import styles from './styles.module.css';

export default class CompanyNavMobile extends Component {
    render() {
        const {navTiles, onUpdateView, onToggleNav} = this.props;

        return (
            <View>
                <Breadcrumb onClick={() => onUpdateView([])}>
                    Our Company
                </Breadcrumb>
                <ul className={styles.container}>
                    {navTiles.map((navTile) => (
                        <Tile key={navTile._id}>
                            <Link to={navTile.linkUrl} onClick={onToggleNav}>
                                {navTile.headline}
                                <h2 className="t--type-display-two">
                                    {navTile.title}
                                </h2>
                            </Link>
                        </Tile>
                    ))}
                </ul>
            </View>
        );
    }
}
