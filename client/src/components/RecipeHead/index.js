import React, {Component, PropTypes} from 'react';
import marked from 'marked';

import styles from './styles.module.css';

export default class RecipeHead extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        heroImage: PropTypes.string.isRequired,
        ingredients: PropTypes.array.isRequired,
        nutrition: PropTypes.string.isRequired,
        servingSize: PropTypes.number.isRequired,
        cookTime: PropTypes.number.isRequired
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {
            title,
            heroImage,
            ingredients,
            nutrition,
            servingSize,
            cookTime
        } = this.props;

        return (
            <section className={styles.container}>
                <div className={styles.hero}>
                    <img src={heroImage} alt={title} />
                </div>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <div className={styles.meta}>
                        <div className={styles.servingSize}>Serves {servingSize} people</div>
                        <div className={styles.cookTime}>Takes {cookTime} minutes</div>
                    </div>
                    <div className={styles.ingredients}>
                        <h3>Ingredients</h3>
                        <ul>
                            {ingredients.map((item, idx) => (
                                <li key={`ingredient${idx}`}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.ingredients}>
                        <h3>Nutrition</h3>
                        <p dangerouslySetInnerHTML={this.renderMarkup(nutrition)}></p>
                    </div>
                </div>
            </section>
        );
    }
}
