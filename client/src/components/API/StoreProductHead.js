import React, {Component, PropTypes} from 'react';

import StorePrdctHeadCmpnt from '../StoreProductHead';

export default class StoreProductHead extends Component {
    static propTypes = {
        data: PropTypes.shape({
            products: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                product_type: PropTypes.string.isRequired, // eslint-disable-line
                body_html: PropTypes.string.isRequired, // eslint-disable-line
                tags: PropTypes.string.isRequired,
                variants: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    product_id: PropTypes.number, // eslint-disable-line
                    title: PropTypes.string,
                    price: PropTypes.string,
                    option1: PropTypes.string,
                    option2: PropTypes.string,
                    option3: PropTypes.string
                })).isRequired,
                options: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    product_id: PropTypes.number, // eslint-disable-line
                    values: PropTypes.array
                })).isRequired,
                images: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    position: PropTypes.number,
                    src: PropTypes.string
                })).isRequired,
                smartLabel: PropTypes.shape({
                    warnings: PropTypes.string.isRequired,
                    rawIngredients: PropTypes.string.isRequired,
                    nutritionSection: PropTypes.shape({
                        nutritionPanels: PropTypes.arrayOf(PropTypes.shape({
                            name: PropTypes.string,
                            servingSize: PropTypes.string,
                            servingSizeUom: PropTypes.string,
                            servingSize2: PropTypes.string,
                            servingSizeUom2: PropTypes.string,
                            servingPerContainer: PropTypes.string,
                            nutrients: PropTypes.arrayOf(PropTypes.shape({
                                name: PropTypes.string,
                                value: PropTypes.string,
                                uom: PropTypes.string,
                                dvp: PropTypes.string,
                                group: PropTypes.string,
                                symbol: PropTypes.string,
                                order: PropTypes.number
                            }))
                        }))
                    }).isRequired
                }).isRequired,
                reviews: PropTypes.shape({
                    id: PropTypes.number,
                    response: PropTypes.shape({
                        bottomline: PropTypes.shape({
                            total_review: PropTypes.number, // eslint-disable-line
                            average_score: PropTypes.number, // eslint-disable-line
                            star_distribution: PropTypes.string // eslint-disable-line
                        }).isRequired,
                        reviews: PropTypes.arrayOf(PropTypes.shape({
                            id: PropTypes.number.isRequired,
                            score: PropTypes.number.isRequired,
                            content: PropTypes.string,
                            created_at: PropTypes.instanceOf(Date), // eslint-disable-line
                            title: PropTypes.string,
                            user: PropTypes.shape({
                                display_name: PropTypes.string // eslint-disable-line
                            }).isRequired
                        }))
                    })
                }).isRequired
            }))
        })
    }

    render() {
        const {products} = this.props.data;
        const item = products[0];

        return (
            <StorePrdctHeadCmpnt
                title={item.title}
                tags={item.tags}
                variants={item.variants}
                options={item.options}
                images={item.images}
                image={item.image}
                description={item.body_html}
                nutrition={item.smartLabel}
                ingredients={item.smartLabel.rawIngredients}
                reviews={item.reviews}
            />
        );
    }
}
