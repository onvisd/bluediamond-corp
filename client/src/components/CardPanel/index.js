import React, {Component, PropTypes} from 'react';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';
import Button from '../Button';
import styles from './styles.module.css';

import Card from '../Card';

export default class CardPanel extends Component {
    static PropTypes = {
        type: PropTypes.string.isRequired,
        cards: PropTypes.array.isRequired,
        title: PropTypes.string,
        theme: PropTypes.string
    }

    state = {
        activeTab: 0
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeTab: currentIndices[0]
        }));
    }

    renderCard = (data) => {
        const {type} = this.props;

        let imageUrl = `${data}media/?size=m`; // Instagram Media URL, medium size
        let linkToUrl = data;
        let children = null;
        if(type === 'recipes') {
            imageUrl = data.fields.cardBackgroundImage.fields.file.url;
            linkToUrl = `/recipes/${data.fields.slug}`;
            children = [
                <h3 key={0}>{data.fields.name}</h3>,
                <p key={1}>{data.fields.cookTime} minutes <span>|</span> {data.fields.difficulty}</p>
            ];
        }

        return (
            <Card
                key={data.sys ? data.sys.id : data}
                type={type}
                imageUrl={imageUrl}
                linkTo={{
                    url: linkToUrl,
                    external: type === 'instagram'
                }}
            >
                {children}
            </Card>
        );
    }

    render() {
        const {activeTab} = this.state;
        const {type, title, theme, cards} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    {title && <h2>{title}</h2>}
                    <div className={styles.cards}>
                        {cards.map((card) => this.renderCard(card))}
                    </div>
                    <ViewPager className={styles.cardsMobile}>
                        <Frame>
                            <Track
                                viewsToShow={1}
                                infinite
                                onViewChange={this.handleSwipe}
                                style={{display: 'flex'}}
                                ref={(track) => {
                                    this.carouselTrack = track;
                                }}
                            >
                                {cards.map((card, idx) => (
                                    <View style={{flex: '1'}} key={`card-${idx}`}>
                                        {this.renderCard(card)}
                                    </View>
                                ))}
                            </Track>
                        </Frame>
                    </ViewPager>
                    <div className={classnames(styles.tabs, {
                        [styles.padded]: type === 'instagram'
                    })}>
                        {cards.map((card, idx) => (
                            <div
                                key={`card-${idx}`}
                                className={classnames(styles.tab, {
                                    [styles.tabActive]: activeTab === idx
                                })}
                            />
                        ))}
                    </div>
                    {type === 'recipes' && (
                        <Button theme={theme} href="/recipes">
                            See more recipes
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}
