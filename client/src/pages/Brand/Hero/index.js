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
export default class Hero extends Component {
    static PropTypes = {
        logo: PropTypes.string,
        mobileLogo: PropTypes.string,
        logoPosition: PropTypes.stirng,
        image: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
        tagline: PropTypes.string,
        flavorLine: PropTypes.string,
        title: PropTypes.string,
        brand: PropTypes.string,
        video: PropTypes.string,
        videoAutoplay: PropTypes.bool,
        videoShowControls: PropTypes.bool,
        videoMute: PropTypes.bool,
        videoLoop: PropTypes.bool
    }

    render() {
        const {
            responsive,
            logo,
            mobileLogo,
            logoPosition,
            image,
            textColor,
            tagline,
            flavorLine,
            title,
            brand,
            video,
            videoAutoplay,
            videoShowControls,
            videoMute,
            videoLoop
        } = this.props;

        const playerConfig = {
            youtube: {
                playerVars: {
                    showinfo: 0,
                    modestbranding: 1
                }
            }
        };

        if(video) {
            return (
                <div className={classnames(
                    styles.container,
                    styles.isVideo,
                    styles[textColor],
                    styles[logoPosition],
                    styles[brand]
                )}>
                    {(title || tagline) &&
                        <div className={classnames(
                            styles.innerContainer,
                            styles[logoPosition]
                        )}>
                            {!responsive.small && logo &&
                                <img src={logo} className={classnames(
                                    styles.logo,
                                    styles[logoPosition]
                                )} alt={title} />
                            }
                            {responsive.small && mobileLogo &&
                                <img src={mobileLogo} className={classnames(
                                    styles.logo,
                                    styles[logoPosition]
                                )} alt={title} />
                            }
                            {title && <h2>{title}</h2>}
                            {tagline && <p>{tagline}</p>}
                        </div>
                    }
                    <YouTubePlayer
                        config={playerConfig}
                        className={styles.reactPlayer}
                        url={video}
                        playing={videoAutoplay || false}
                        controls={videoShowControls || false}
                        muted={videoMute || false}
                        loop={videoLoop || false}
                        volume={videoMute ? 0 : 1}
                        width="100%"
                        height="100%"
                    />
                </div>
            );
        }

        return (
            <div>
                <div
                    className={classnames(
                        styles.container,
                        styles[textColor],
                        styles[logoPosition],
                        styles[brand]
                    )}
                    style={{backgroundImage: `url(${image})`}}
                >
                    <div className={classnames(styles.innerContainer, styles[logoPosition])}>
                        {!responsive.small && logo &&
                            <img src={logo} className={classnames(styles.logo, styles[logoPosition])} alt={title} />
                        }
                        {responsive.small && mobileLogo &&
                            <img src={mobileLogo} className={classnames(styles.logo, styles[logoPosition])} alt={title} />
                        }
                        {title && <h2>{title}</h2>}
                        {tagline && <p>{tagline}</p>}
                    </div>
                    {flavorLine && <div className={styles.flavor}>{flavorLine}</div>}
                </div>
            </div>
        );
    }
}
