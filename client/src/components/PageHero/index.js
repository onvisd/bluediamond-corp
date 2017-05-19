import React, {Component, PropTypes} from 'react';
import marked from 'marked';

import Button from '../Button';

import PlayIcon from '../../../assets/images/icon-play.svg';

import styles from './styles.module.css';

export default class PageHero extends Component {
    state = {
        videoOpen: false
    };

    static propTypes = {
        headline: PropTypes.string.isRequired,
        showHeadline: PropTypes.bool.isRequired,
        content: PropTypes.string,
        buttonText: PropTypes.string,
        buttonLink: PropTypes.string,
        backgroundImage: PropTypes.string,
        video: PropTypes.string,
        backgroundVideo: PropTypes.bool,
        playVideo: PropTypes.bool
    }

    // Toggler video player visabiity,
    // auto play video when open, pause when closed.
    toggleVideoPlayer = (e) => {
        e.preventDefault();

        this.setState({
            videoOpen: !this.state.videoOpen
        });

        return this.state.videoOpen ? this.video.pause() : this.video.play();
    }

    // Render video player
    renderVideoPlayer() {
        const file = this.props.video;

        return (
            <div className={styles.videoWrap}>
                <video
                    ref={(video) => {
                        this.video = video;
                    }}
                    onClick={this.toggleVideoPlayer}
                    className={styles.videoPlayer}
                    controls
                >
                    <source src={file} />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    // Parse markdown content
    renderMarkup(field) {
        return {__html: marked(field)};
    }

    // If background image, render it as the background image,
    // or load background video object.
    renderBackground() {
        const {video, backgroundImage, backgroundVideo} = this.props;
        const style = {
            backgroundImage: `url(${!backgroundVideo && backgroundImage})`
        };

        return (
            <div className={styles.background} style={style}>
                {backgroundVideo &&
                    <video autoPlay loop muted>
                        <source src={video} />
                        Your browser does not support the video tag.
                    </video>
                }
            </div>
        );
    }

    render() {
        const {
            headline,
            showHeadline,
            content,
            buttonLink,
            buttonText,
            video,
            playVideo
        } = this.props;

        const {videoOpen} = this.state;

        return (
            <div className={`${styles.container} ${videoOpen ? styles.videoOpen : ''}
                ${video ? styles.hasVideo : ''}`}>
                <div className={`${styles.innerContainer} ${video ? styles.hasVideo : ''}`}>
                    {showHeadline && <h1>{headline}</h1>}
                    {content &&
                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={this.renderMarkup(content)}
                        />
                    }
                    {(buttonText && buttonLink) &&
                        <Button href={buttonLink}>{buttonText}</Button>
                    }
                    {(video && playVideo) &&
                        <div className={styles.playIcon}>
                            <a href="#" onClick={this.toggleVideoPlayer}>
                                <PlayIcon /> {buttonText}
                            </a>
                        </div>
                    }
                </div>
                {this.renderBackground()}
                {(video && playVideo) && this.renderVideoPlayer()}
            </div>
        );
    }
}
