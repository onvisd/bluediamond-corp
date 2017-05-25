import React, {Component, PropTypes} from 'react';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';
import styles from './styles.module.css';

import Story from '../Story';
import leftArrow from '../../../../assets/images/icons/arrow-left.png';
import rightArrow from '../../../../assets/images/icons/arrow-right.png';

export default class Stories extends Component {
    static propTypes = {
        stories: PropTypes.arrayOf(PropTypes.shape({
            fields: PropTypes.shape({
                tagline: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                backgroundImage: PropTypes.shape({
                    file: PropTypes.shape({
                        url: PropTypes.string.isRequired
                    })
                }),
                textAlignment: PropTypes.string.isRequired
            })
        })).isRequired
    }

    state = {
        activeTab: 0
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeTab: currentIndices[0]
        }));
    }

    render() {
        const {activeTab} = this.state;
        const {stories} = this.props;

        return (
            <ViewPager className={styles.container}>
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
                        {stories.map((story) => (
                            <View style={{flex: '1'}} key={story.sys.id}>
                                <Story
                                    tagline={story.fields.tagline}
                                    content={story.fields.content}
                                    image={story.fields.backgroundImage.fields.file.url}
                                    align={story.fields.textAlignment}
                                />
                            </View>
                        ))}
                    </Track>
                </Frame>
                <img
                    src={leftArrow}
                    className={styles.prev}
                    onClick={() => this.carouselTrack.prev()}
                />
                <img
                    src={rightArrow}
                    className={styles.next}
                    onClick={() => this.carouselTrack.next()}
                />
                <div className={styles.tabs}>
                    {stories.map((story, idx) => (
                        <div
                            key={story.sys.id}
                            className={classnames(styles.tab, {
                                [styles.tabActive]: activeTab === idx
                            })}
                        />
                    ))}
                </div>
            </ViewPager>
        );
    }
}
