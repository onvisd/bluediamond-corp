import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Tile from 'components/Navigation/Tile';
import Card from 'components/Navigation/Card';
import Breadcrumb from '../Breadcrumb';
import styles from './styles.module.css';

import Blossom from 'images/backgrounds/almond-blossom-no-shadow.png';
import Almonds from 'images/backgrounds/almonds-nav.png';
import Leaf from 'images/backgrounds/almond-leaf-nav.png';

const bgs = [
    Blossom,
    Almonds,
    Leaf
];

export default class Company extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        toggleNav: PropTypes.object.isRequired,
        companyNavTiles: PropTypes.array.isRequired
    }

    navigate = {
        backwards: () => {
            this.props.navigate('Root', {enter: 'left', leave: 'right'});
        },
        forwards: (brand) => {
            this.props.navigate('Brand', {enter: 'right', leave: 'left'}, {brand});
        }
    }

    render() {
        const {companyNavTiles, toggleNav} = this.props;

        return (
            <Card>
                <Breadcrumb onClick={this.navigate.backwards}>
                    Our Company
                </Breadcrumb>
                <ul className={styles.container}>
                    {companyNavTiles.map((navTile, i) => (
                        <Tile key={navTile.sys.id} bgImage={bgs[i]}>
                            <Link to={`/${navTile.fields.linkUrl}`} onClick={toggleNav.hide}>
                                <p>{navTile.fields.headline}</p>
                                <h2>{navTile.fields.title}</h2>
                            </Link>
                        </Tile>
                    ))}
                </ul>
            </Card>
        );
    }
}
