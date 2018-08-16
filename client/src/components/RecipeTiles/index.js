import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Card from 'components/Card';
import RecipeCarousel from 'components/RecipeCarousel';

import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class RecipeTiles extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        tilesPerRow: PropTypes.number
    }

    state = {
        rows: []
    }

    componentDidMount() {
        const {rows} = this.state;
        const {items, tilesPerRow} = this.props;

        const allItems = items;
        const numberOfRows = Math.round(items.length / tilesPerRow) + 1;

        for (let i = 0; i < numberOfRows; i++)
            rows[i] = allItems.splice(0, tilesPerRow);
    }

    render() {
        const {items, responsive, tilesPerRow} = this.props;
        const {rows} = this.state;

        return responsive.medium
            ? (
                <RecipeCarousel carouselItems={items} />
            )
            : (
                <div className={styles.container}>
                    {rows.map((item, i) => (
                        <div
                            key={`row-${i}`}
                            className={styles.tilesContainer}
                        >
                            {rows[i].map((card, int) => {
                                let tileFlex = '0 0 calc(20% - 1rem)';
                                if(tilesPerRow === 4)
                                    tileFlex = '0 0 calc(25% - 1rem)';
                                if(tilesPerRow === 3)
                                    tileFlex = '0 0 calc(33% - 1rem)';

                                return (
                                    <Card
                                        style={{
                                            flex: rows[i].length < tilesPerRow
                                                ? tileFlex
                                                : '1'
                                        }}
                                        className={styles.item}
                                        key={int}
                                        type="recipes"
                                        imageUrl={card.fields.image.fields.file.url}
                                        linkTo={{url: card.fields.link, external: false}}
                                    >
                                        <h3>{card.fields.title}</h3>
                                        <p>{card.fields.subtitle}</p>
                                    </Card>
                                );
                            })}
                        </div>
                    ))}
                </div>
            );
    }
}
