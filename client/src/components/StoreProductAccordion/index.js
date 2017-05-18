import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

import CaretDown from '../../../assets/images/caret-down.svg';
import SmartLabel from '../../../assets/images/smartLabel.png';

export default class ProductAccordion extends Component {
    state = {
        nutritionOpen: false,
        ingredientOpen: false
    };

    static propTypes = {
        nutrition: PropTypes.object.isRequired,
        ingredients: PropTypes.string.isRequired
    }

    handleClick = (space) => {
        this.setState((state) => ({
            nutritionOpen: space === 'nutrition' ? !state.nutritionOpen : false,
            ingredientOpen: space === 'ingredient' ? !state.ingredientOpen : false
        }));
    }

    renderNutrients() {
        const {nutrition} = this.props;
        const panels = nutrition.nutritionSection.nutrientPanels;

        return (
            <div className={styles.nutrients}>
                {panels.map((panel, i) =>
                    <div key={`nutritionPanel${i}`} className={styles.nutrientDetails}>
                        <p>{panel.name}</p>
                        {this.renderNutrientList(panel.nutrients)}
                    </div>
                )}
            </div>
        );
    }

    renderNutrientList(nutrients) {
        return (
            <div className={styles.nutrient}>
                {nutrients.map((nutrient, i) =>
                    <span key={`nurtient${i}`}>
                        <p>{nutrient.name}, {nutrient.value}, {nutrient.uom}</p>
                    </span>
                )}
            </div>
        );
    }

    render() {
        const {ingredients} = this.props;

        const nutritionClass = `${
            styles.accordionItem
        } ${classnames({[styles.isOpen]: this.state.nutritionOpen})}`;

        const ingredientClass = `${
            styles.accordionItem
        } ${classnames({[styles.isOpen]: this.state.ingredientOpen})}`;

        return (
            <div className={styles.accordion}>
                <div className={nutritionClass}>
                    <div
                        onClick={() => this.handleClick('nutrition')}
                        className={styles.accordionTitle}
                    >
                        <p>Nutrition Facts</p>
                        <CaretDown />
                    </div>
                    <div className={styles.accordionContent}>
                        {this.renderNutrients()}
                    </div>
                </div>
                <div className={ingredientClass}>
                    <div
                        onClick={() => this.handleClick('ingredient')}
                        className={styles.accordionTitle}
                    >
                        <p>Ingredients</p>
                        <CaretDown />
                    </div>
                    <div className={styles.accordionContent}>
                        <p>{ingredients}</p>
                    </div>
                </div>
                <div className={styles.smartLabelLogo}>
                    <img src={SmartLabel} />
                </div>
            </div>
        );
    }
}
