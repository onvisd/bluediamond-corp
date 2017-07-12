import React, {Component, PropTypes} from 'react';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';
import ReactGA from 'react-ga';

import ArrowLeft from 'images/icons/arrow-left.svg';
import ArrowRight from 'images/icons/arrow-right.svg';
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
        onViewChange: PropTypes.func,
        name: PropTypes.string
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

        if(this.props.name) {
            ReactGA.event({
                category: 'interaction',
                action: 'swipe',
                label: this.props.name
            });
        }
    }

    prev = () => {
        this.carouselTrack.prev();

        if(this.props.name) {
            ReactGA.event({
                category: 'interaction',
                action: 'click',
                label: this.props.name
            });
        }
    }

    next = () => {
        this.carouselTrack.next();

        if(this.props.name) {
            ReactGA.event({
                category: 'interaction',
                action: 'click',
                label: this.props.name
            });
        }
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
                    onClick={this.prev}
                />
            );
        }

        if(activeIndex < tabs[tabs.length - 1] || settings.infinite) {
            arrows.push(
                <ArrowRight
                    key="arrowRight"
                    className={styles.next}
                    onClick={this.next}
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

        if(tabs.length === 1)
            return null;

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

        const pages = cards.map((card, idx) => idx)
            .filter((card, idx) => idx % settings.viewsToShow === 0);

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
                {showOverlay && pages.length > 1 ? (
                    <div
                        className={styles.overlay}
                        style={this.getOverlayStyle()}
                    />
                ) : null}
                {showArrows && this.renderArrow()}
                {showTabs && this.renderTabs()}
            </ViewPager>
        );
    }
}
