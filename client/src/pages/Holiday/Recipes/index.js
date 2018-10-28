import React, { Component } from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import Layout from '../Layout';
import './slick.css';
import './slick-theme.css';

import productImageOne from '../Layout/images/sliderOne/product-img.png';
import productImageTwo from '../Layout/images/sliderTwo/product-img.png';
import productImageThree from '../Layout/images/sliderThree/product-img.png';
import productImageFour from '../Layout/images/sliderFour/product-img.png';
import bannerRecepiesF1 from '../Layout/images/sliderOne/banner1RecipesF1.png';
import bannerRecepiesF2 from '../Layout/images/sliderOne/banner1RecipesF2.png';
import bannerRecepiesF3 from '../Layout/images/sliderOne/banner1RecipesF3.png';
import bannerRecepiesF2_1 from '../Layout/images/sliderTwo/banner2RecipesF1.png';
import bannerRecepiesF2_2 from '../Layout/images/sliderTwo/banner2RecipesF2.png';
import bannerRecepiesF2_3 from '../Layout/images/sliderTwo/banner2RecipesF3.png';
import bannerRecepiesF3_1 from '../Layout/images/sliderThree/banner3RecipesF1.png';
import bannerRecepiesF3_2 from '../Layout/images/sliderThree/banner3RecipesF2.png';
import bannerRecepiesF3_3 from '../Layout/images/sliderThree/banner3RecipesF3.png';
import bannerRecepiesF4_1 from '../Layout/images/sliderFour/banner4RecipesF1.png';
import bannerRecepiesF4_2 from '../Layout/images/sliderFour/banner4RecipesF2.png';
import bannerRecepiesF4_3 from '../Layout/images/sliderFour/banner4RecipesF3.png';

function PrevButton(props) {
    return (
        <span
            className="carousel-control-prev"
            onClick={props.onClick}
            role="button"
            data-slide="prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
        </span>
    );
}
function NextButton(props) {
    return (
        <span
            className="carousel-control-next"
            role="button"
            data-slide="next"
            onClick={props.onClick}
        >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
        </span>
    );
}

export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carousels: [
                {
                    title: 'First Carousel',
                    items: [
                        {
                            title: 'A Tale of Herbs\n& Sesame',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF1 }
                        },
                        {
                            title: 'A Tale of Herbs\n& Sesame',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF2 }
                        },
                        {
                            title: 'A Tale of Herbs\n& Sesame',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF3 }
                        }
                    ]
                },
                {
                    title: 'Second Carousel',
                    items: [
                        {
                            title: 'A Gift of Truffle and Seeds',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF2_1 }
                        },
                        {
                            title: 'A Gift of Truffle and Seeds',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF2_2 }
                        },
                        {
                            title: 'A Gift of Truffle and Seeds',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF2_3 }
                        }
                    ]
                },
                {
                    title: 'Third Carousel',
                    items: [
                        {
                            title: 'Jolly Pink Salt-Chia Combo',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF3_1 }
                        },
                        {
                            title: 'Jolly Pink Salt-Chia Combo',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF3_2 }
                        },
                        {
                            title: 'Jolly Pink Salt-Chia Combo',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et',
                            image: { url: bannerRecepiesF3_3 }
                        }
                    ]
                },
                {
                    title: 'Fourth Carousel',
                    items: [
                        {
                            title: 'The Rosemary-Flax Spirit',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et,',
                            image: { url: bannerRecepiesF4_1 }
                        },
                        {
                            title: 'The Rosemary-Flax Spirit',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et,',
                            image: { url: bannerRecepiesF4_1 }
                        },
                        {
                            title: 'The Rosemary-Flax Spirit',
                            subtitle:
                                'Nam porttitor blandit accumsan. vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, commodo mi consec tetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et,',
                            image: { url: bannerRecepiesF4_1 }
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount = () => {
        fetch('/api/holidays/recipes/content')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    carousels: res.carousels
                });
            })
            .catch((err) => console.error(err));
    };

    render() {
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextButton />,
            prevArrow: <PrevButton />
        };

        return (
            <Layout>
                <div id="content-section-main">
                    {/* <!-- baner-section --> */}
                    <section id="baner-section" className="recipes-banners">
                        {this.state.carousels.map((carousel) => (
                            <div
                                id="carouselExampleControls"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <Slider {...sliderSettings}>
                                        {carousel.items.map((item) => (
                                            <div>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image.url}
                                                    alt="First slide"
                                                />
                                                <div className="carousel-caption d-md-block">
                                                    {item.title.split('\n').map((x) => (
                                                        <h5>{x}</h5>
                                                    ))}
                                                    <p className="text-detail">{item.subtitle}</p>
                                                    <div className="carousel-img-download">
                                                        <img src={productImageOne} alt="" />
                                                        <Link to="http://a.co/fdIGaVX">
                                                            Start Your Cart
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </Layout>
        );
    }
}
