import React, {Component} from 'react';
import {Link} from 'react-router';
import Layout from '../Layout';

export default class Recipes extends Component {
    render() {
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
                                <div className="carousel-item active">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderOne/banner1RecipesF1.jpg"
                                        alt="First slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>A Tale of Herbs & Sesame</h5>
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
                                                src="images/sliderOne/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderOne/banner1RecipesF2.jpg"
                                        alt="Second slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>A Tale of Herbs & Sesame</h5>
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
                                                src="images/sliderOne/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderOne/banner1RecipesF3.jpg"
                                        alt="Third slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>A Tale of Herbs & Sesame</h5>
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
                                                src="images/sliderOne/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleControls"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleControls"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                        <div
                            id="carouselExampleControlsTwo"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderTwo/banner2RecipesF1.jpg"
                                        alt="First slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>A Gift of Truffle and Seeds</h5>
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
                                                src="images/sliderTwo/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderTwo/banner2RecipesF2.jpg"
                                        alt="Second slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>A Gift of Truffle and Seeds</h5>
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
                                                src="images/sliderTwo/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderTwo/banner2RecipesF3.jpg"
                                        alt="Third slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>A Gift of Truffle and Seeds</h5>
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
                                                src="images/sliderTwo/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleControlsTwo"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleControlsTwo"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                        <div
                            id="carouselExampleControlsThree"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderThree/banner3RecipesF1.jpg"
                                        alt="First slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>Jolly Pink Chia Combo</h5>
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
                                                src="images/sliderThree/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderThree/banner3RecipesF2.jpg"
                                        alt="Second slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>Jolly Pink Chia Combo</h5>
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
                                                src="images/sliderThree/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderThree/banner3RecipesF3.jpg"
                                        alt="Third slide"
                                    />
                                    <div className="carousel-caption d-md-block">
                                        <h5>Jolly Pink Chia Combo</h5>
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
                                                src="images/sliderThree/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleControlsThree"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleControlsThree"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                        <div
                            id="carouselExampleControlsFour"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderFour/banner4RecipesF1.jpg"
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
                                                src="images/sliderFour/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderFour/banner4RecipesF2.jpg"
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
                                                src="images/sliderFour/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="images/sliderFour/banner4RecipesF3.jpg"
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
                                                src="images/sliderFour/product-img.png"
                                                alt=""
                                            />
                                            <Link to="">
                                                Download Shopping List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleControlsFour"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleControlsFour"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }
}
