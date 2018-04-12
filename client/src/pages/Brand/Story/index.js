import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import classnames from 'classnames';

import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class Story extends Component {
    static propTypes = {
        link: PropTypes.string,
        desktopImage: PropTypes.string.isRequired,
        smallDesktopImage: PropTypes.string.isRequired,
        tabletImage: PropTypes.string.isRequired,
        mobileImage: PropTypes.string.isRequired,
        video: PropTypes.string,
        videoAutoplay: PropTypes.bool,
        videoShowControls: PropTypes.bool,
        videoMute: PropTypes.bool,
        videoStarted: PropTypes.func,
        videoStopped: PropTypes.func
    };


    render() {
        const {
            desktopImage,
            smallDesktopImage,
            tabletImage,
            mobileImage,
            link,
            video,
            videoAutoplay,
            videoShowControls,
            videoMute,
            responsive
        } = this.props;

        let image = desktopImage;
        if(responsive.xsmall)
            image = mobileImage;
        else if(responsive.small)
            image = tabletImage;
        else if(responsive.medium)
            image = smallDesktopImage;

        const playerConfig = {
            youtube: {
                playerVars: {
                    showinfo: 0,
                    modestbranding: 1,
                    rel: 0,
                    color: 'white',
                    autohide: 1,
                    iv_load_policy: 3, // eslint-disable-line
                    controls: null
                }
            }
        };

        if(link) {
            return (
                <a
                    href={link}
                    target="_blank"
                    className={styles.container}
                    style={{
                        backgroundImage: `url(${image})`
                    }}
                />
            );
        }

        if(video) {
            return (
                <div className={classnames(styles.container, styles.isVideo)}>
                    <YouTubePlayer
                        config={playerConfig}
                        className={styles.reactPlayer}
                        url={video}
                        playing={videoAutoplay || false}
                        controls={videoShowControls || false}
                        muted={videoMute || false}
                        volume={videoMute ? 0 : 1}
                        width="100%"
                        height="100%"
                        onPlay={this.props.videoStarted}
                        onPause={this.props.videoStopped}
                        onEnded={this.props.videoStopped}
                    />
                </div>
            );
        }

        return (
            <div
                className={styles.container}
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
        );
    }
}
