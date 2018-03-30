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
                    heroVideo: PropTypes.string,
                    heroVideoAutoplay: PropTypes.bool,
                    heroVideoShowControls: PropTypes.bool,
                    heroVideoMute: PropTypes.bool,
                    consumerSymbols: PropTypes.array,
                    servingSize: PropTypes.number.isRequired,
                    servingSizeOz: PropTypes.number,
                    serviceSizeG: PropTypes.number,
                    totalFat: PropTypes.string,
                    totalCarbohydrates: PropTypes.string,
                    cholesterol: PropTypes.string,
                    sodium: PropTypes.string,
                    potassium: PropTypes.string,
                    dietaryFiber: PropTypes.string,
                    sugars: PropTypes.string,
                    protein: PropTypes.string,
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
                heroVideo={fields.heroVideo}
                heroVideoAutoplay={fields.heroVideoAutoplay || false}
                heroVideoShowControls={fields.heroVideoShowControls || false}
                heroVideoMute={fields.heroVideoMute || false}
                consumerSymbols={fields.consumerSymbols || null}
                nutrition={nutrition}
                difficulty={fields.difficulty}
                cookTime={fields.cookTime}
            />
        );
    }
}
