import React, { Component } from 'react';
import Layout from '../Layout';
import invite_Icon from '../Layout/images/invite-icon.png';
import music_Icon from '../Layout/images/music-icon.png';
import product_Icon_01 from '../Layout/images/product-01-img.png';
import product_Icon_01_1 from '../Layout/images/product-01.1-img.png';
import platter_Icon from '../Layout/images/platter-icon.png';
import fire_Icon from '../Layout/images/fire-icon.png';
import blueDiamondCover_t2_V2 from '../Layout/images/blue-diamond-cover_t2_V2.png';
import product_02 from '../Layout/images/product-02-img.png';
import product_02_1 from '../Layout/images/product-02.1-img.png';
import product_03 from '../Layout/images/product-03-img.png';
import product_03_1 from '../Layout/images/product-03.1-img.png';
import product_04 from '../Layout/images/product-04-img.png';
import product_04_1 from '../Layout/images/product-04.1-img.png';
import instagram from '../Layout/images/insta-01.png';

export default class Home extends Component {
    // constructor(props) {
    //   super(props);
    //   this.setState = {
    //     toggle: false
    //   };
    //   this.handleToggle = this.handleToggle.bind(this);
    // }
    // handleToggle() {
    //   this.setState({
    //     toggle: true
    //   });
    // }
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
                                        src={blueDiamondCover_t2_V2}
                                        alt=""
                                    />
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
                                                    A Take of Herbs & <br />{' '}
                                                    Sesame
                                                </h1>
                                            </div>
                                            <div className="product-bottom">
                                                <p className="text-right">
                                                    Garlic Herb & olive oil
                                                    Almonds and artisan Sesame
                                                    Seed Nut-thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img
                                                        src={product_Icon_01_1}
                                                        alt=""
                                                    />
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
                                                    Black Truffle Almonds and
                                                    Artisan Multi-Seeds
                                                    Nut-thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img
                                                        src={product_02_1}
                                                        alt=""
                                                    />
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
                                                    Pink Himalayan Salt Almonds
                                                    and Artisaqn Chia Seeds
                                                    Nut-Thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img
                                                        src={product_03_1}
                                                        alt=""
                                                    />
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
                                                    Rosemary and Sea Salt
                                                    Almonds and Aetisan Flax
                                                    Seeds Nuts-Thins
                                                </p>
                                                <div className="prop-imgs">
                                                    <img
                                                        src={product_04_1}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- build party section --> */}
                    <section className="build-party">
                        <div className="container sm-container">
                            <div className="duble-headings text-center">
                                <h1>Build A Party</h1>
                                <p>
                                    Find in each of our social channels
                                    something special for your parties
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                    <div className="text-center mb-4">
                                        <img
                                            className="party-icon"
                                            src={invite_Icon}
                                            alt=""
                                        />
                                        <p className="party-icon-text">
                                            Invite
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                    <div className="text-center mb-4">
                                        <img
                                            className="party-icon"
                                            src={music_Icon}
                                            alt=""
                                        />
                                        <p className="party-icon-text">Music</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                    <div className="text-center mb-4">
                                        <img
                                            className="party-icon"
                                            src={fire_Icon}
                                            alt=""
                                        />
                                        <p className="party-icon-text">
                                            Set the Mood
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                    <div className="text-center mb-4">
                                        <img
                                            className="party-icon"
                                            src={platter_Icon}
                                            alt=""
                                        />
                                        <p className="party-icon-text">
                                            Platters
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="get-inspired">
                        <div className="container sm-container">
                            <div className="duble-headings text-center">
                                <h1>Get Inspired</h1>
                                <p>
                                    Keep Up With our latest and delicious
                                    instagram activity
                                </p>
                            </div>
                            <div className="instagram-images-sec">
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pl-2 pr-2 ">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={instagram}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }
}
