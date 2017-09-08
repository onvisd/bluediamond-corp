import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import {ShareButtons} from 'react-share';

import NutritionFacts from '../NutritionFacts';

import callFloodlight from 'tools/callFloodlight';

import Facebook from 'images/icons/facebook.svg';
import Pinterest from 'images/icons/pinterest.svg';
import Twitter from 'images/icons/twitter.svg';

import GlutenFree from 'images/icons/gluten-free.svg';
import HeartHealthy from 'images/icons/heart-healthy.svg';
import Kosher from 'images/icons/kosher.svg';
import ReducedSugar from 'images/icons/reduced-sugar.svg';
import Unsweetened from 'images/icons/unsweetened.svg';
import Vegan from 'images/icons/vegan.svg';

import styles from './styles.module.css';

const {
    FacebookShareButton,
    PinterestShareButton,
    TwitterShareButton
} = ShareButtons;

export default class RecipeHead extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        heroImage: PropTypes.string.isRequired,
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

    trackFloodlight(value) {
        return () => {
            callFloodlight.click('4035228', 'fy18s0', value);
        };
    }

    render() {
        const {
            title,
            heroImage,
            nutrition,
            difficulty,
            cookTime,
            consumerSymbols
        } = this.props;

        return (
            <section className={styles.container}>
                <div className={styles.left} style={{
                    backgroundImage: `url(${heroImage})`
                }} />
                <div className={styles.right}>
                    <div className={styles.content}>
                        <div className={styles.head}>
                            <h2>{title}</h2>
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
                                        onClick={this.trackFloodlight('faceb0')}
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
                                        onClick={this.trackFloodlight('pinte0')}
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
                                        onClick={this.trackFloodlight('tweet0')}
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
