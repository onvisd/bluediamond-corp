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
                        <div
                            id="carouselExampleControls"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <Slider {...sliderSettings}>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF1}
                                            alt="First slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>A Tale of Herbs & Sesame</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageOne}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF2}
                                            alt="Second slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>A Tale of Herbs & Sesame</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageOne}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF3}
                                            alt="Third slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>A Tale of Herbs & Sesame</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageOne}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>

                        <div
                            id="carouselExampleControlsTwo"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <Slider {...sliderSettings}>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF2_1}
                                            alt="First slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>A Gift of Truffle and Seeds</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageTwo}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF2_2}
                                            alt="Second slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>A Gift of Truffle and Seeds</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageTwo}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF2_3}
                                            alt="Third slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>A Gift of Truffle and Seeds</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageTwo}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>

                        <div
                            id="carouselExampleControlsThree"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <Slider {...sliderSettings}>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF3_1}
                                            alt="First slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>Jolly Pink Chia Combo</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageThree}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF3_2}
                                            alt="Second slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>Jolly Pink Chia Combo</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageThree}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className="d-block w-100"
                                            src={bannerRecepiesF3_3}
                                            alt="Third slide"
                                        />
                                        <div className="carousel-caption d-md-block">
                                            <h5>Jolly Pink Chia Combo</h5>
                                            <p>Difficulty 1</p>
                                            <p>Time: 10 mins.</p>
                                            <p className="text-detail">
                                                Nam porttitor blandit accumsan.
                                                vel dictum sem, a pretium dui.
                                                In malesuada enim in dolor
                                                euismod, commodo mi consec
                                                tetur. Curabitur at vestibulum
                                                nisi. Nullam vehicula nisi
                                                velit. Mauris turpis nisl,
                                                molestie ut ipsum et,
                                            </p>
                                            <div className="carousel-img-download">
                                                <img
                                                    src={productImageThree}
                                                    alt=""
                                                />
                                                <Link to="">
                                                    Download Shopping List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                            
                        </div>

                        <div
                            id="carouselExampleControlsFour"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                            <Slider {...sliderSettings}>
                                <div>
                                    <img
                                        className="d-block w-100"
                                        src={bannerRecepiesF4_1}
                                        alt="First slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>The Rosemary-Flax Spirit</h5>
                                        <p>Difficulty 1</p>
                                        <p>Time: 10 mins.</p>
                                        <p className="text-detail">
                                            Nam porttitor blandit accumsan. vel
                                            dictum sem, a pretium dui. In
                                            malesuada enim in dolor euismod,
                                            commodo mi consec tetur. Curabitur
                                            at vestibulum nisi. Nullam vehicula
                                            nisi velit. Mauris turpis nisl,
                                            molestie ut ipsum et,
                                        </p>
                                        <div className="carousel-img-download">
                                            <img
                                                src={productImageFour}
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        className="d-block w-100"
                                        src={bannerRecepiesF4_2}
                                        alt="Second slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>The Rosemary-Flax Spirit</h5>
                                        <p>Difficulty 1</p>
                                        <p>Time: 10 mins.</p>
                                        <p className="text-detail">
                                            Nam porttitor blandit accumsan. vel
                                            dictum sem, a pretium dui. In
                                            malesuada enim in dolor euismod,
                                            commodo mi consec tetur. Curabitur
                                            at vestibulum nisi. Nullam vehicula
                                            nisi velit. Mauris turpis nisl,
                                            molestie ut ipsum et,
                                        </p>
                                        <div className="carousel-img-download">
                                            <img
                                                src={productImageFour}
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        className="d-block w-100"
                                        src={bannerRecepiesF4_3}
                                        alt="Third slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>The Rosemary-Flax Spirit</h5>
                                        <p>Difficulty 1</p>
                                        <p>Time: 10 mins.</p>
                                        <p className="text-detail">
                                            Nam porttitor blandit accumsan. vel
                                            dictum sem, a pretium dui. In
                                            malesuada enim in dolor euismod,
                                            commodo mi consec tetur. Curabitur
                                            at vestibulum nisi. Nullam vehicula
                                            nisi velit. Mauris turpis nisl,
                                            molestie ut ipsum et,
                                        </p>
                                        <div className="carousel-img-download">
                                            <img
                                                src={productImageFour}
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                </Slider>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }
}
