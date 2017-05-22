import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Tile from '../../Tile';
import Breadcrumb from '../Breadcrumb';
import Card from '../../Card';
import styles from './styles.module.css';

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
                    {companyNavTiles.map((navTile) => (
                        <Tile key={navTile._id}>
                            <Link to={`/${navTile.linkUrl}`} onClick={toggleNav.hide}>
                                <p>{navTile.headline}</p>
                                <h2>{navTile.title}</h2>
                            </Link>
                        </Tile>
                    ))}
                </ul>
            </Card>
        );
    }
}
