import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import {
    FacebookShareButton,
    PinterestShareButton,
    TwitterShareButton
} from 'react-share';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import classnames from 'classnames';

import NutritionFacts from '../NutritionFacts';

import Facebook from 'images/icons/facebook.svg';
import Pinterest from 'images/icons/pinterest.svg';
import Twitter from 'images/icons/twitter.svg';

import GlutenFree from 'images/icons/gluten-free.svg';
import HeartHealthy from 'images/icons/heart-healthy.svg';
import Kosher from 'images/icons/kosher-k.svg';
import ReducedSugar from 'images/icons/reduced-sugar.svg';
import Unsweetened from 'images/icons/unsweetened.svg';
import Vegan from 'images/icons/vegan.svg';

import styles from './styles.module.css';

export default class RecipeHead extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        heroImage: PropTypes.string.isRequired,
        heroVideo: PropTypes.string,
        heroVideoAutoplay: PropTypes.bool,
        heroVideoShowControls: PropTypes.bool,
        heroVideoMute: PropTypes.bool,
        consumerSymbols: PropTypes.array,
        nutrition: PropTypes.array.isRequired,
        difficulty: PropTypes.string.isRequired,
        cookTime: PropTypes.number.isRequired
    }

    metaIcons = {
        GlutenFree,
        HeartHealthy,
        Kosher,
        ReducedSugar,
        Unsweetened,
        Vegan
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    renderSymbols() {
        const {consumerSymbols} = this.props;

        if(!consumerSymbols)
            return;

        return (
            <div className={styles.labels}>
                {consumerSymbols.filter((tag) => tag !== 'N/A').map((tag, i) => {
                    const Icon = this.metaIcons[tag.replace(' ', '')];
                    return (
                        <span key={`consumerSymbols${i}`}>
                            {Icon && <Icon />} {tag}
                        </span>
                    );
                })}
            </div>
        );
    }

    trackShare(value) {
        return () => {
            if(typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'floodlight',
                    activity: value
                });
            }
        };
    }

    render() {
        const {
            title,
            heroImage,
            heroVideo,
            heroVideoAutoplay,
            heroVideoShowControls,
            heroVideoMute,
            nutrition,
            difficulty,
            cookTime,
            consumerSymbols
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
            <section className={styles.container}>
                {!heroVideo &&
                    <div className={styles.left} style={{
                        backgroundImage: `url(${heroImage})`
                    }} />
                }
                {heroVideo &&
                    <div className={classnames(styles.left, styles.isVideo)}>
                        <YouTubePlayer
                            config={playerConfig}
                            className={styles.reactPlayer}
                            url={heroVideo}
                            playing={heroVideoAutoplay || false}
                            controls={heroVideoShowControls || false}
                            muted={heroVideoMute || false}
                            volume={heroVideoMute ? 0 : 1}
                            width="100%"
                            height="100%"
                        />
                    </div>
                }
                <div className={styles.right}>
                    <div className={styles.content}>
                        <div className={styles.head}>
                            <h1>{title}</h1>
                            {consumerSymbols && this.renderSymbols()}
                        </div>
                        <div className={styles.foot}>
                            <div className={styles.footContent}>
                                <div className={styles.meta}>
                                    <div className={styles.metaItem}>
                                        <p>Cooking Time</p>
                                        <h3>{cookTime} minutes</h3>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <p>Difficulty</p>
                                        <h3>{difficulty}</h3>
                                    </div>
                                    {nutrition[0].servingSize > 0 && (
                                        <div className={styles.metaItem}>
                                            <p>Serves Up To</p>
                                            <h3>{nutrition[0].servingSize}</h3>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.nutritionFacts}>
                                    {nutrition && <NutritionFacts
                                        nutrition={nutrition}
                                        pageType="recipe"
                                    />}
                                </div>
                                <div className={styles.share}>
                                    <span>Share this recipe:</span>
                                    <span
                                        onClick={this.trackShare('faceb0')}
                                    >
                                        <FacebookShareButton
                                            className={styles.shareButton}
                                            url={
                                                typeof window === 'undefined' ? '' : location.href
                                            }
                                        >
                                                <Facebook />
                                        </FacebookShareButton>
                                    </span>
                                    <span
                                        onClick={this.trackShare('pinte0')}
                                    >
                                        <PinterestShareButton
                                            className={styles.shareButton}
                                            media={heroImage}
                                            description={
                                                `A ${
                                                    cookTime
                                                } minute recipe for ${
                                                    title
                                                } with Almond Breeze.`
                                            }
                                            url={
                                                typeof window === 'undefined' ? '' : location.href
                                            }
                                        >
                                            <Pinterest />
                                        </PinterestShareButton>
                                    </span>
                                    <span
                                        onClick={this.trackShare('tweet0')}
                                    >
                                        <TwitterShareButton
                                            className={styles.shareButton}
                                            url={
                                                typeof window === 'undefined' ? '' : location.href
                                            }
                                        >
                                            <Twitter />
                                        </TwitterShareButton>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
