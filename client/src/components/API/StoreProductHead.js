import React, {Component, PropTypes} from 'react';

import StorePrdctHeadCmpnt from '../StoreProductHead';

export default class StoreProductHead extends Component {
    static propTypes = {
        data: PropTypes.shape({
            product: PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                productType: PropTypes.string.isRequired, // eslint-disable-line
                descriptionHtml: PropTypes.string.isRequired, // eslint-disable-line
                handle: PropTypes.string.isRequired,
                tags: PropTypes.array.isRequired,
                options: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.string,
                    name: PropTypes.string,
                    values: PropTypes.array
                })).isRequired,
                images: PropTypes.shape({
                    edges: PropTypes.object({
                        node: PropTypes.shape({
                            src: PropTypes.string
                        })
                    })
                }).isRequired
            }),
            variants: PropTypes.arrayOf(PropTypes.shape({
                node: PropTypes.shape({
                    id: PropTypes.string,
                    title: PropTypes.string,
                    weight: PropTypes.number,
                    price: PropTypes.string,
                    compareAtPrice: PropTypes.string,
                    images: PropTypes.shape({
                        edges: PropTypes.object({
                            node: PropTypes.shape({
                                src: PropTypes.string
                            })
                        })
                    }).isRequired
                })
            })).isRequired,
            smartLabel: PropTypes.shape({
                warnings: PropTypes.string,
                rawIngredients: PropTypes.string,
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
                })
            }),
            reviews: PropTypes.shape({
                bottomline: PropTypes.shape({
                    total_review: PropTypes.number, // eslint-disable-line
                    average_score: PropTypes.number, // eslint-disable-line
                    star_distribution: PropTypes.string // eslint-disable-line
                }),
                reviews: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    score: PropTypes.number.isRequired,
                    content: PropTypes.string,
                    created_at: PropTypes.instanceOf(Date), // eslint-disable-line
                    title: PropTypes.string,
                    user: PropTypes.shape({
                        display_name: PropTypes.string // eslint-disable-line
                    })
                }))
            }),
            images: PropTypes.object
        })
    }

    render() {
        const {data} = this.props;
        const smartLabel = data.smartLabel;
        const ingredients = smartLabel ? smartLabel.rawIngredients : null;

        return (
            <StorePrdctHeadCmpnt
                handle={data.product.handle}
                title={data.product.title}
                productType={data.product.productType}
                tags={data.product.tags}
                variants={data.variants}
                options={data.product.options}
                images={data.product.images.edges}
                image={data.images[data.product.images.edges[0].node.id]}
                description={data.product.descriptionHtml}
                nutrition={smartLabel && smartLabel}
                ingredients={ingredients}
                reviews={data.reviews}
            />
        );
    }
}
