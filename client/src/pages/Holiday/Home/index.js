import React, { Component } from 'react';
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
import Popup from '../Popup';
// import tis from '../../../../assets/tis.png';

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
            },
            isOpen: false
        };
    }

    openPopup = () => {
        this.setState({
            isOpen: true
        });
    };

    closePopup = () => {
        this.setState({
            isOpen: false
        });
    };

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
        const shareLink = 'http://holiday.urtestsite.com';
        const tis = 'https://images.ctfassets.net/eipaypwf4tdc/2eNHNLwZLSU04WOOqMII2i/406886eb0ec265c528122ac98d7375e2/tis.png';
        let title = 'Our friendship’s like a great board: it only exists if we come together. Join me on [day] at [time] for a holiday celebration full of great pairings—like you and me. See you at [address]. Cheers!';
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
                                <div
                                    className="banner-text"
                                    dangerouslySetInnerHTML={this.renderMarkup(
                                        this.state.hero.content
                                    )}
                                />
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
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
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
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
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
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 p-0">
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
                                </div>
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
                                            <img
                                                className="party-icon"
                                                src={inviteIcon}
                                                alt=""
                                                onClick={this.openPopup}
                                            />
                                            {/* <FacebookShareButton
                                                url={shareLink}
                                                quote={title}
                                                className="social-media-icon"
                                            >
                                                
                                            </FacebookShareButton>*/}
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
                    <Popup show={this.state.isOpen} onClose={this.closePopup}>
                        <div className="dm-pop">
                        <textarea className="form-control"
                                type="text"
                                placeholder="Search"
                                title="Type search term here"
                                defaultValue={title}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const url = shareLink;
                                        const image = tis;
                                        const description = e.target.value;

                                        FB.ui({
                                            method: 'share_open_graph',
                                            action_type: 'og.likes',
                                            action_properties: JSON.stringify({
                                                object: {
                                                    'og:url': url,
                                                    'og:title': title,
                                                    'og:description': description,
                                                    'og:image': tis
                                                }
                                            })
                                        });
                                    }
                                }}
                            />
                            <img src={tis} alt="" className="fbPopUp" />
                            <div className="shareButton">
                            <button className="fbShare">Share</button>
                            </div>
                        </div>
                    </Popup>                  
                </div>
            </Layout>
        );
    }
}
