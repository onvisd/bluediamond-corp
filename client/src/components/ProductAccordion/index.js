import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

import CaretDown from 'images/icons/caret-down.svg';
import SmartLabel from 'images/icons/smart-label.png';

export default class ProductAccordion extends Component {
    static propTypes = {
        nutrition: PropTypes.object.isRequired,
        ingredients: PropTypes.string.isRequired
    }

    state = {
        nutritionOpen: false,
        ingredientOpen: false
    };

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
                    <div key={`nutritionPanel${i}`} className={styles.nutritionPanel}>
                        <h5>{panel.name}</h5>
                        {this.renderNutrientList(panel.nutrients)}
                    </div>
                )}
            </div>
        );
    }

    renderNutrientList(nutrients) {
        const calories = nutrients.filter(
            (nutrient) => nutrient.name.match(/Calories( from Fat)?/i)
        );
        const totalFat = nutrients.filter(
            (nutrient) => nutrient.name.match(/Total Fat/i)
        )[0];
        const otherFats = nutrients
            .filter((nutrient) => nutrient.name.match(/(.+?) Fat/))
            .filter((nutrient) => !nutrient.name.match(/(Total|Calories from) Fat/i));
        const totalCarbs = nutrients.filter(
            (nutrient) => nutrient.name.match(/Total Carbohydrate/)
        )[0];
        const otherCarbs = nutrients.filter(
            (nutrient) => nutrient.name.match(/Dietary Fiber|Sugars/)
        );
        const otherFacts = nutrients.filter(
            (nutrient) => !nutrient.name.match(/Calories|Fat|Carbohydrate|Dietary Fiber|Sugars/i)
        );

        return (
            <table className={styles.nutrition}>
                <tbody>
                    <tr>
                        <td>
                            <strong>{calories[0].name} </strong>
                            {calories[0].value}
                        </td>
                        <td>
                            {calories[1].name} {calories[1].value}
                        </td>
                    </tr>
                    <tr key="divider">
                        <td colSpan={2} className={styles.divider}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><strong>{totalFat.name}</strong></td>
                        <td>{totalFat.value}{totalFat.uom}</td>
                    </tr>
                    {otherFats.map((fat, i) => (
                        <tr className={styles.sublist} key={`fats${i}`}>
                            <td>{fat.name}</td>
                            <td>{fat.value}{fat.uom}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>{totalCarbs.name}</strong></td>
                        <td>{totalCarbs.value}{totalCarbs.uom}</td>
                    </tr>
                    {otherCarbs.map((carb, i) => (
                        <tr className={styles.sublist} key={`fats${i}`}>
                            <td>{carb.name}</td>
                            <td>{carb.value}{carb.uom}</td>
                        </tr>
                    ))}
                    {otherFacts.map((nutrient, i) => [
                        <tr key={`nutrient${i}`}>
                            <td><strong>{nutrient.name}</strong></td>
                            <td>{nutrient.value}{nutrient.uom}</td>
                        </tr>,
                        nutrient.name === 'Protein' ? (
                            <tr key="divider">
                                <td colSpan={2} className={styles.divider}>&nbsp;</td>
                            </tr>
                        ) : null
                    ])}
                </tbody>
            </table>
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
