import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Footer extends Component {
    render() {
        return (
            <footer className="site-footer">
                <div className="links-footer">
                    <div className="container sm-container">
                        <div className="first-links-footer">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="footer-social">
                                        <ul className="float-left">
                                            <li className="pl-0 ml-0">
                                                <Link to="">
                                                    <i
                                                        className="fa fa-facebook-official"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">
                                                    <i
                                                        className="fa fa-youtube-play"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">
                                                    <i
                                                        className="fa fa-instagram"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">
                                                    <i
                                                        className="fa fa-pinterest"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">
                                                    <i
                                                        className="fa fa-twitter"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 p-0">
                                    <div className="footer-contact">
                                        <ul className="float-right">
                                            <li>
                                                <i
                                                    className="fa fa-phone-square"
                                                    aria-hidden="true"
                                                />
                                                <Link to="">(800) 9872329</Link>
                                            </li>
                                            <li className="pr-0 mr-0">
                                                <i
                                                    className="fa fa-envelope"
                                                    aria-hidden="true"
                                                />
                                                <Link to="">
                                                    Support@bdgrowers.com
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="Secound-links-footer">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pl-2 pr-2">
                                            <ul>
                                                <li>
                                                    <p>Classic Snack Almonds</p>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Traditional Flavors
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Blod Flavors
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Honey Roasted
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Oven Roasted
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pl-2 pr-2">
                                            <ul>
                                                <li>
                                                    <p>Almond Breeze</p>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Almondmilk
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        AlmondMilk Blends
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">Recipes</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pl-2 pr-2">
                                            <ul>
                                                <li>
                                                    <p>Nut-Thins</p>
                                                </li>
                                                <li>
                                                    <Link to="">Original</Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Artisan Nut-Thins
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pl-2 pr-2">
                                            <ul>
                                                <li>
                                                    <p>Classic Snack Almonds</p>
                                                </li>
                                                <li>
                                                    <Link to="">Gourmet</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pl-2 pr-2">
                                            <ul>
                                                <li>
                                                    <p>Information</p>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Terms of Use
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Privacy Policy
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">Press</Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Foodservice
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">FAQ</Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Contact Us
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pl-2 pr-2">
                                            <ul>
                                                <li>
                                                    <p>Company</p>
                                                </li>
                                                <li>
                                                    <Link to="">Our Craft</Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Our History
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">Our Story</Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Our Growers
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Almond Insights Blog
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Product Locator
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="">Store</Link>
                                                </li>
                                                <li>
                                                    <Link to="">Careers</Link>
                                                </li>
                                                <li>
                                                    <Link to="">
                                                        Community Giving
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copright-footer">
                    <div className="container sm-container">
                        <div className="row">
                            <p>&copy; 2018 Blue Diamond Growers</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
