import React, {Component, PropTypes} from 'react';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';

import ArrowLeft from '../../../assets/images/icons/arrow-left.svg';
import ArrowRight from '../../../assets/images/icons/arrow-right.svg';
import styles from './styles.module.css';

export default class Carousel extends Component {
    static propTypes = {
        cards: PropTypes.array.isRequired,
        settings: PropTypes.object,
        classNames: PropTypes.object,
        containerClass: PropTypes.string,
        cardClasses: PropTypes.object,
        showOverlay: PropTypes.bool,
        showArrow: PropTypes.bool,
        showTabs: PropTypes.bool,
        tabColor: PropTypes.string,
        onViewChange: PropTypes.func
    }

    static defaultProps = {
        settings: {
            viewsToShow: 1,
            infinite: true
        },
        classNames: {},
        showOverlay: false,
        showArrows: false,
        showTabs: false,
        tabColor: 'dark'
    }

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex || 0
        };
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeIndex: currentIndices[0]
        }), () => {
            if(this.props.onViewChange)
                this.props.onViewChange(currentIndices[0]);
        });
    }

    getOverlayStyle = () => {
        const {activeIndex} = this.state;

        if(activeIndex === 0) {
            return {
                backgroundImage:
                    `linear-gradient(
                        to left,
                        rgba(255, 255, 255, 1) 4%,
                        rgba(255, 255, 255, 0) 8%
                    )`
            };
        }

        return {
            backgroundImage:
                `linear-gradient(
                    to right,
                    rgba(255, 255, 255, 1) 4%,
                    rgba(255, 255, 255, 0) 8%
                )`
        };
    }

    renderArrow = () => {
        const {activeIndex} = this.state;
        const {cards, settings} = this.props;
        const arrows = [];
        const tabs = cards.map((card, idx) => idx)
            .filter((card, idx) => idx % settings.viewsToShow === 0);

        if(activeIndex > tabs[0] || settings.infinite) {
            arrows.push(
                <ArrowLeft
                    key="arrowLeft"
                    className={styles.prev}
                    onClick={() => this.carouselTrack.prev()}
                />
            );
        }

        if(activeIndex < tabs[tabs.length - 1] || settings.infinite) {
            arrows.push(
                <ArrowRight
                    key="arrowRight"
                    className={styles.next}
                    onClick={() => this.carouselTrack.next()}
                />
            );
        }

        return arrows;
    }

    renderTabs = () => {
        const {activeIndex} = this.state;
        const {cards, settings, tabColor} = this.props;
        const tabs = cards.map((card, idx) => idx)
            .filter((card, idx) => idx % settings.viewsToShow === 0);

        return (
            <div className={`${styles.tabs} ${styles[tabColor]}`}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={classnames(styles.tab, {
                            [styles.tabActive]: activeIndex === tab
                        })}
                    />
                ))}
            </div>
        );
    }

    render() {
        const {cards, settings, classNames, showOverlay, showArrows, showTabs} = this.props;

        return (
            <ViewPager className={classNames.container}>
                <Frame>
                    <Track
                        onViewChange={this.handleSwipe}
                        style={{display: 'flex'}}
                        ref={(track) => {
                            this.carouselTrack = track;
                        }}
                        {...settings}
                    >
                        {cards.map((card, idx) => (
                            <View style={{flex: '1'}} key={`card-${idx}`}>
                                {card}
                            </View>
                        ))}
                    </Track>
                </Frame>
                {showOverlay && (
                    <div
                        className={styles.overlay}
                        style={this.getOverlayStyle()}
                    />
                )}
                {showArrows && this.renderArrow()}
                {showTabs && this.renderTabs()}
            </ViewPager>
        );
    }
}
