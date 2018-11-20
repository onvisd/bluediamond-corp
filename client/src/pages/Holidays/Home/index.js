import React, { Component } from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import Layout from '../Layout';
import product_Icon_01 from '../Layout/images/product-01-img.png';
import product_Icon_01_1 from '../Layout/images/product-01.1-img.png';
import blueDiamondCover_t2_V2 from '../Layout/images/blue-diamond-cover_t2_V2.jpg';
import blueDiamondPartyModule from '../Layout/images/build-party-back.png';
import product_02 from '../Layout/images/product-02-img.png';
import product_02_1 from '../Layout/images/product-02.1-img.png';
import product_03 from '../Layout/images/product-03-img.png';
import product_03_1 from '../Layout/images/product-03.1-img.png';
import product_04 from '../Layout/images/product-04-img.png';
import product_04_1 from '../Layout/images/product-04.1-img.png';
import inviteIcon from '../Layout/images/invite-icon.png';
import musicIcon from '../Layout/images/music-icon.png';
import fireIcon from '../Layout/images/fire-icon.png';
import platterIcon from '../Layout/images/platter-icon.png';
import { FacebookProvider, Share } from 'react-facebook';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hero: {
                backgroundImageUrl: blueDiamondCover_t2_V2,
                content: ` `
            },
            gallery: {
                images: [
                    { url: product_02, title: '' },
                    { url: product_03, title: '' },
                    { url: product_04, title: '' },
                    { url: product_02, title: '' }
                ]
            },
            buildPartyHero: {
                backgroundImageUrl: blueDiamondPartyModule,
                content: ''
            }
        };
    }

    componentDidMount = () => {
        fetch('/api/holidays/content')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    hero: res.hero,
                    gallery: res.gallery,
                    buildPartyHero: res.buildPartyHero
                });
            })
            .catch((err) => console.error(err));
    };

    renderMarkup(field) {
        return { __html: marked(field) };
    }

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
                                        src={this.state.hero.backgroundImageUrl}
                                        alt=""
                                    />
                                </div>
                                {/*<div
                                    className="banner-text"
                                    dangerouslySetInnerHTML={this.renderMarkup(
                                        this.state.hero.content
                                    )}
                                />*/}
                                <div className="banner-text">
                                    <div className="b-heading">
                                        <h2>Your Holiday <br/>Entertaining Starts Here.</h2>
                                    </div>
                                    <div className="b-text">
                                    <p>Show your guests that you thought about every detail with our amazing pairings.</p>
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
                                <Link to="/holidays/recipes" className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={this.state.gallery.images[0].url} alt="" />
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
                                </Link>
                                <Link  to="/holidays/recipes" className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={this.state.gallery.images[1].url} alt="" />
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
                                </Link>
                                <Link  to="/holidays/recipes" className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={this.state.gallery.images[2].url} alt="" />
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
                                </Link>
                                <Link  to="/holidays/recipes" className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="box-main shadow-lg">
                                        <div className="product-image text-left">
                                            <img src={this.state.gallery.images[3].url} alt="" />
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
                                </Link>
                            </div>
                        </div>
                    </section>
                    {/* <!-- build party section */}
                    <section className="build-party">
                        <div className="build-img">
                            <img
                                className="full-img"
                                src={this.state.buildPartyHero.backgroundImageUrl}
                                alt=""
                            />
                        </div>
                        <div className="content-block">
                            <div
                                className="duble-headings text-center"
                                dangerouslySetInnerHTML={this.renderMarkup(
                                    this.state.buildPartyHero.content
                                )}
                            />
                            <div className="container sm-container">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <div className="text-center mb-4">
                                            <FacebookProvider appId="2185001408409392">
                                                <Share href="http://localhost:8080/holiday">
                                                <img
                                                    className="party-icon"
                                                    src={inviteIcon}
                                                    alt=""
                                                    disabled="loading"
                                                  />
                                                </Share>
                                            </FacebookProvider>
                                            <p className="party-icon-text">Invite</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <div className="text-center mb-4">
                                            <img className="party-icon" src={musicIcon} alt="" />
                                            <p className="party-icon-text">Music</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <div className="text-center mb-4">
                                            <img className="party-icon" src={fireIcon} alt="" />
                                            <p className="party-icon-text">Set the Mood</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <div className="text-center mb-4">
                                            <img className="party-icon" src={platterIcon} alt="" />
                                            <p className="party-icon-text">Platters</p>
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
