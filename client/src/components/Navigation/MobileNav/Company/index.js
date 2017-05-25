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
                        <Tile key={navTile.sys.id}>
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
