import React, {Component, PropTypes} from 'react';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import styles from './styles.module.css';

import BrandStory from '../BrandStory';
import leftArrow from '../../../assets/images/arrow_left.png';
import rightArrow from '../../../assets/images/arrow_right.png';

export default class BrandStories extends Component {
    static propTypes = {
        stories: PropTypes.arrayOf(PropTypes.shape({
            tagline: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            backgroundImage: PropTypes.shape({
                file: PropTypes.shape({
                    url: PropTypes.string.isRequired
                })
            }),
            textAlignment: PropTypes.string.isRequired
        })).isRequired
    }

    render() {
        const {stories} = this.props;

        return (
            <ViewPager className={styles.container}>
                <Frame>
                    <Track
                        viewsToShow={1}
                        infinite
                        style={{display: 'flex'}}
                        ref={(track) => {
                            this.carouselTrack = track;
                        }}
                    >
                        {stories.map((story, idx) => (
                            <View style={{flex: '1'}} key={`brandStory${idx}`}>
                                <BrandStory
                                    tagline={story.tagline}
                                    content={story.content}
                                    image={story.backgroundImage.file.url}
                                    align={story.textAlignment}
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
            </ViewPager>
        );
    }
}
