import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Carousel from 'components/Carousel';
import Card from 'components/Card';

import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class RecipeCarousel extends Component {
    static propTypes = {
        carouselItems: PropTypes.array.isRequired
    }

    render() {
        const {carouselItems, responsive} = this.props;

        const carouselCards = carouselItems.map((item, i) => (
                <Card
                    className={styles.carouselItem}
                    key={i}
                    type="recipes"
                    imageUrl={item.fields.image.fields.file.url}
                    linkTo={{url: item.fields.link, external: false}}
                >
                    <h3>{item.fields.title}</h3>
                    <p>{item.fields.subtitle}</p>
                </Card>
        ));

        let slidesShown = carouselCards.length === 4 ? 3 : 5;
        if(responsive.xsmall)
            slidesShown = 1;
        else if(responsive.medium)
            slidesShown = 3;

        let align = 0.5;
        if(carouselCards.length <= 3)
            align = 0;
        if(carouselCards.length === 4)
            align = 1;

        let viewClass = styles.carouselView;
        if(carouselCards.length <= 3)
            viewClass = styles.shortCarouselView;
        if(carouselCards.length === 4)
            viewClass = styles.midCarouselView;

        return (
            <div className={styles.container}>
                <Carousel
                    cards={carouselCards}
                    settings={{
                        viewsToShow: slidesShown,
                        viewsToMove: 1,
                        align,
                        infinite: carouselCards.length > 4 && true,
                        swipe: responsive.xsmall && true
                    }}
                    classNames={{
                        container: carouselCards.length <= 3
                            ? styles.shortCarouselContainer
                            : styles.carouselContainer,
                        track: carouselCards.length <= 3 && styles.carouselTrack,
                        view: viewClass,
                        overlay: carouselCards.length > 4 && styles.carouselOverlay
                    }}
                    showTabs={false}
                    showOverlay={!responsive.xsmall && carouselCards.length > 3 && true}
                    showArrows={responsive.xsmall || carouselCards.length > 3 && true}
                />
            </div>
        );
    }
}
