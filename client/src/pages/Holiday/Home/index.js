import React, { Component } from 'react';
import Layout from '../Layout';
import product_Icon_01 from '../Layout/images/product-01-img.png';
import product_Icon_01_1 from '../Layout/images/product-01.1-img.png';
import blueDiamondCover_t2_V2 from '../Layout/images/blue-diamond-cover_t2_V2.jpg';
import product_02 from '../Layout/images/product-02-img.png';
import product_02_1 from '../Layout/images/product-02.1-img.png';
import product_03 from '../Layout/images/product-03-img.png';
import product_03_1 from '../Layout/images/product-03.1-img.png';
import product_04 from '../Layout/images/product-04-img.png';
import product_04_1 from '../Layout/images/product-04.1-img.png';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: {
                heroImage: blueDiamondCover_t2_V2
            }
        };
    }

    componentDidMount = () => {
        fetch('/api/holidays/assets')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    assets: {
                        heroImage: res.heroImage
                    }
                });
            })
            .catch((err) => console.error(err));
    };

    render() {
        return (
            <Layout>
                <div id="content-section-main">
                    {/* <!-- baner-section --> */}
                    <section id="baner-section">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="banner">
                                    <img
                                        className="img-fluid"
                                        src={this.state.assets.heroImage}
                                        alt=""
                                    />
                                </div>
                                <div className="banner-text">
                                    <div className="b-heading">
                                        <h2>Your Holiday<br/>Entertaining Starts Here.</h2>
                                    </div>
                                    <div className="b-text">
                                        <p>Show your guests that you thought about<br/>every detail with our amazing pairings.</p>
                                       
                                    </div>
                                    <div className="title-comment">
                                        <p>The Uncommon Almond.<sup>TM</sup></p>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- Products boxes section --> */}
                    <section className="products-boxes">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={product_Icon_01} alt="" />
                                        </div>
                                        <div className="product-content">
                                            <div className="product-heading">
                                                <h1>
                                                    A Take of Herbs & <br /> Sesame
                                                </h1>
                                            </div>
                                            <div className="product-bottom">
                                                <p className="text-right">
                                                    Garlic Herb & olive oil Almonds and artisan
                                                    Sesame Seed Nut-thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img src={product_Icon_01_1} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={product_02} alt="" />
                                        </div>
                                        <div className="product-content">
                                            <div className="product-heading">
                                                <h1>
                                                    A Gift of Truffle & <br />
                                                    Seeds
                                                </h1>
                                            </div>
                                            <div className="product-bottom">
                                                <p className="text-right">
                                                    Black Truffle Almonds and Artisan Multi-Seeds
                                                    Nut-thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img src={product_02_1} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={product_03} alt="" />
                                        </div>
                                        <div className="product-content">
                                            <div className="product-heading">
                                                <h1>
                                                    Jolly Pink Chia <br />
                                                    Combo
                                                </h1>
                                            </div>
                                            <div className="product-bottom">
                                                <p className="text-right">
                                                    Pink Himalayan Salt Almonds and Artisaqn Chia
                                                    Seeds Nut-Thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img src={product_03_1} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={product_04} alt="" />
                                        </div>
                                        <div className="product-content">
                                            <div className="product-heading">
                                                <h1>
                                                    The Rosemary-Flax
                                                    <br /> Spirit
                                                </h1>
                                            </div>
                                            <div className="product-bottom">
                                                <p className="text-right">
                                                    Rosemary and Sea Salt Almonds and Aetisan Flax
                                                    Seeds Nuts-Thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img src={product_04_1} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- build party section removed--> */}
                </div>
            </Layout>
        );
    }
}
