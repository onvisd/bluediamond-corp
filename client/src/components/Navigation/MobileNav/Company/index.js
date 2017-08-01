import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Tile from 'components/Navigation/Tile';
import Card from 'components/Navigation/Card';
import Breadcrumb from '../Breadcrumb';
import sortByPriority from 'tools/sortByPriority';
import styles from './styles.module.css';

export default class Company extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        toggleNav: PropTypes.object.isRequired,
        company: PropTypes.array.isRequired
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
        const {company, toggleNav} = this.props;
        const tiles = company.filter((item) => item.fields.isTile).sort(sortByPriority);

        return (
            <Card>
                <Breadcrumb onClick={this.navigate.backwards}>
                    Our Company
                </Breadcrumb>
                <ul className={styles.container}>
                    {tiles.map((navTile) => (
                        <Tile
                            key={navTile.sys.id}
                            bgImage={navTile.fields.backgroundImage.fields.file.url}
                        >
                            <Link to={navTile.fields.url} onClick={toggleNav.hide}>
                                <p>{navTile.fields.linkSecondaryText}</p>
                                <h2>{navTile.fields.linkText}</h2>
                            </Link>
                        </Tile>
                    ))}
                </ul>
            </Card>
        );
    }
}
