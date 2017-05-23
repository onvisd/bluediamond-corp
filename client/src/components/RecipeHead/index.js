import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import marked from 'marked';

import styles from './styles.module.css';

import CaretDown from '../../../assets/images/icons/caret-down.svg';

export default class RecipeHead extends Component {
    state = {
        nutritionOpen: false,
        ingredientOpen: true
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        heroImage: PropTypes.string.isRequired,
        ingredients: PropTypes.array.isRequired,
        nutrition: PropTypes.string.isRequired,
        servingSize: PropTypes.number.isRequired,
        cookTime: PropTypes.number.isRequired
    }

    handleClick = () => {
        this.setState((state) => ({
            nutritionOpen: !state.nutritionOpen,
            ingredientOpen: !state.ingredientOpen
        }));
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

        const nutritionClass = `${
            styles.accordionItem
        } ${classnames({[styles.isOpen]: this.state.nutritionOpen})}`;

        const ingredientClass = `${
            styles.accordionItem
        } ${classnames({[styles.isOpen]: this.state.ingredientOpen})}`;

        return (
            <section className={styles.container}>
                <div className="l--container">
                    <div className="l--row">
                        <div className="l--col-12-at-s l--col-6">
                            <div className={styles.hero}>
                                <img src={heroImage} alt={title} />
                            </div>
                        </div>
                        <div className="l--col-12-at-s l--col-6">
                            <div className={styles.content}>
                                <h2>{title}</h2>
                                <div className={styles.meta}>
                                    <div className={styles.cookTime}>
                                        <p>Cooking Time:</p>
                                        <h3>{cookTime} minutes</h3>
                                    </div>
                                    <div className={styles.servingSize}>
                                        <p>Serves:</p>
                                        <h3>Up to {servingSize}</h3>
                                    </div>
                                </div>
                                <div className={styles.accordion}>
                                    <div className={nutritionClass}>
                                        <div onClick={this.handleClick}
                                        className={styles.accordionTitle}>
                                            <h4>Nutritional Info</h4>
                                            <CaretDown />
                                        </div>
                                        <div className={styles.accordionContent} dangerouslySetInnerHTML={this.renderMarkup(nutrition)}>
                                        </div>
                                    </div>
                                    <div className={ingredientClass}>
                                        <div onClick={this.handleClick} className={styles.accordionTitle}>
                                            <h4>Ingredients</h4>
                                            <CaretDown />
                                        </div>
                                        <div className={styles.accordionContent}>
                                            <ul>
                                                {ingredients.map((item, idx) => (
                                                    <li key={`ingredient${idx}`}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
