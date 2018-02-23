import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class NutritionFacts extends Component {
    static propTypes = {
        nutrition: PropTypes.array.isRequired,
        pageType: PropTypes.string.isRequired,
        theme: PropTypes.string
    }

    render() {
        const {nutrition, pageType, theme} = this.props;
        const item = nutrition[0];

        return (
            <section classname={theme}>
                <p><strong>Nutrition Facts</strong></p>
                {pageType === 'product' &&
                    <p>
                        Serving Size {item.servingSizeOz} ({item.serviceSizeG}g)
                        Servings per Package {item.servingSize}
                    </p>
                }
                <div className={styles.facts}>
                    <div className={styles.table}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Total Fat</td>
                                    <td className="t--align-right">{item.totalFat}</td>
                                </tr>
                                <tr>
                                    <td>Cholesterol</td>
                                    <td className="t--align-right">{item.cholesterol}</td>
                                </tr>
                                <tr>
                                    <td>Sodium</td>
                                    <td className="t--align-right">{item.sodium}</td>
                                </tr>
                                <tr>
                                    <td>Potassium</td>
                                    <td className="t--align-right">{item.potassium}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.table}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Total Carbohydrate</td>
                                    <td className="t--align-right">{item.totalCarbohydrates}</td>
                                </tr>
                                <tr className={styles.inline}>
                                    <td>Dietary Fiber</td>
                                    <td className="t--align-right">{item.dietaryFiber}</td>
                                </tr>
                                <tr className={styles.inline}>
                                    <td>Sugars</td>
                                    <td className="t--align-right">{item.sugars}</td>
                                </tr>
                                <tr>
                                    <td>Protein</td>
                                    <td className="t--align-right">{item.protein}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        );
    }
}
