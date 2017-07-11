import React, {Component, PropTypes} from 'react';
import marked from 'marked';

import NutritionFacts from '../NutritionFacts';

import Facebook from 'images/icons/facebook.svg';
import Pinterest from 'images/icons/pinterest.svg';
import Twitter from 'images/icons/twitter.svg';

import styles from './styles.module.css';

export default class RecipeHead extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        heroImage: PropTypes.string.isRequired,
        consumerSymbols: PropTypes.array,
        nutrition: PropTypes.array.isRequired,
        difficulty: PropTypes.string.isRequired,
        cookTime: PropTypes.number.isRequired
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    renderSymbols() {
        const {consumerSymbols} = this.props;

        return (
            <div className={styles.labels}>
                {consumerSymbols.filter((tag) => tag !== 'N/A').map((item, i) =>
                    <div key={`symbol${i}`} className={styles.label}>{item}</div>
                )}
            </div>
        );
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
                                    <div className={styles.metaItem}>
                                        <p>Serves Up To</p>
                                        <h3>{nutrition[0].servingSize}</h3>
                                    </div>
                                </div>
                                <div className={styles.nutritionFacts}>
                                    {nutrition && <NutritionFacts
                                        nutrition={nutrition}
                                        pageType="recipe"
                                    />}
                                </div>
                                <div className={styles.share}>
                                    <span>Share this recipe:</span>
                                    <a href="#"><Facebook /></a>
                                    <a href="#"><Pinterest /></a>
                                    <a href="#"><Twitter /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
