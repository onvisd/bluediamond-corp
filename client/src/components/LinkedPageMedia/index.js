import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import {connect} from 'react-redux';
import classNames from 'classnames';
import YouTubePlayer from 'react-player/lib/players/YouTube';

import image from 'tools/image';
import Button from '../Button';
import styles from './styles.module.css';

@connect((state) => ({
    responsive: state.responsive
}))
export default class LinkedPageMedia extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired,
        imageFile: PropTypes.string,
        video: PropTypes.object,
        mediaAlign: PropTypes.string.isRequired,
        buttonText: PropTypes.string,
        buttonLink: PropTypes.string,
        buttonStyle: PropTypes.string
    };

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {
            header,
            paragraph,
            imageFile,
            video,
            mediaAlign,
            buttonText,
            buttonLink,
            buttonStyle,
            theme,
            responsive
        } = this.props;

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

        return (
            <section className={classNames(styles.container, styles[theme])}>
                <div className={classNames(styles.content, {[styles[mediaAlign]]: mediaAlign})}>
                    <div>
                        <h2 className="t--size-xl">{header}</h2>
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={this.renderMarkup(paragraph)}
                        />
                        {buttonText && (
                            <Button href={buttonLink} theme={buttonStyle}>
                                {buttonText}
                            </Button>
                        )}
                    </div>
                </div>

                <div className={classNames(styles.frame, {[styles[mediaAlign]]: mediaAlign})}>
                    {video ? (
                        <YouTubePlayer
                            config={playerConfig}
                            className={styles.reactPlayer}
                            url={video.fields.url}
                            playing={video.fields.autoplay || false}
                            controls={video.fields.showControls || false}
                            muted={video.fields.mute || false}
                            volume={video.fields.mute ? 0 : 1}
                            width="100%"
                            height={responsive.innerWidth >= 768 ? '420px' : '200px'}
                        />
                    ) : (
                        <div
                            className={styles.imageWrap}
                            style={{
                                backgroundImage: `url(${image(imageFile, {
                                    format: 'jpg',
                                    quality: 70,
                                    progressive: true
                                })})`
                            }}
                        />
                    )}
                </div>
            </section>
        );
    }
}
