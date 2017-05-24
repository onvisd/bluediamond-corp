import React, {Component, PropTypes} from 'react';

import RecipeHeadComponent from '../RecipeHead';

export default class RecipeHead extends Component {
    static propTypes = {
        data: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    heroImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    }).isRequired,
                    consumerSymbols: PropTypes.array,
                    servingSize: PropTypes.number.isRequired,
                    servingSizeOz: PropTypes.number.isRequired,
                    serviceSizeG: PropTypes.number.isRequired,
                    totalFat: PropTypes.string.isRequired,
                    totalCarbohydrates: PropTypes.string.isRequired,
                    cholesterol: PropTypes.string.isRequired,
                    sodium: PropTypes.string.isRequired,
                    potassium: PropTypes.string.isRequired,
                    dietaryFiber: PropTypes.string.isRequired,
                    sugars: PropTypes.string.isRequired,
                    protein: PropTypes.string.isRequired,
                    difficulty: PropTypes.string.isRequired,
                    cookTime: PropTypes.number.isRequired
                })
            })),
            includes: PropTypes.shape({
                Asset: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    }),
                    fields: PropTypes.shape({
                        title: PropTypes.string.isRequired,
                        file: PropTypes.shape({
                            url: PropTypes.string
                        }).isRequired
                    })
                }))
            })
        })
    }

    render() {
        const {items, includes} = this.props.data;
        const {fields} = items[0];

        const assetsById = {};
        includes.Asset.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        const nutrition = [{
            servingSize: fields.servingSize,
            servingSizeOz: fields.servingSizeOz,
            serviceSizeG: fields.serviceSizeG,
            totalFat: fields.totalFat,
            totalCarbohydrates: fields.totalCarbohydrates,
            cholesterol: fields.cholesterol,
            sodium: fields.sodium,
            potassium: fields.potassium,
            dietaryFiber: fields.dietaryFiber,
            sugars: fields.sugars,
            protein: fields.protein
        }];

        return (
            <RecipeHeadComponent
                title={fields.name}
                heroImage={assetsById[fields.heroImage.sys.id].file.url}
                consumerSymbols={fields.consumerSymbols || null}
                nutrition={nutrition}
                difficulty={fields.difficulty}
                cookTime={fields.cookTime}
            />
        );
    }
}
