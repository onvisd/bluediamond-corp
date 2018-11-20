import React, { Component } from 'react';
import { Link } from 'react-router';
import Title from '../../../components/Title';
import Meta from '../../../components/Meta';

import signInIcon from '../Layout/images/sign-in-icon.png';
import bdlogo from '../Layout/images/bd-logo.png';
import shoppingCartIcon from '../Layout/images/shopping-cart-icon.png';
import growers_icon from '../Layout/images/growers-icon.png';
import gi_Icon from '../Layout/images/gi-icon.png';
import international_Icon from '../Layout/images/international-icon.png';

export default class Header extends Component {
    state = {

        isActive: false,
        day: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        address: ''
    };

    toggleNav = () => {
        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
    };

    render() {
    const ogUrl = 'http://localhost:8080/holiday'

        return (
            <div>
                <Title>Holiday</Title>
                <Meta>{[
                    {
                        property: 'og:url',
                        content: ogUrl
                    },
                    {
                        property: 'og:type',
                        content: 'invite'
                    },
                    {
                        property:'og:title',
                        content: 'Tis the Seasonings'
                    },
                    {
                        property: 'og:description',
                        content: 'Our friendship’s like a great board: it only exists if we come together. Join me on '+this.state.day+' at '+this.state.time+' for a holiday celebration full of great pairings—like you and me. See you at '+this.state.address+'. Cheers! '
                    },
                    {
                        property: 'og:image',
                        content: 'https://images.ctfassets.net/eipaypwf4tdc/2eNHNLwZLSU04WOOqMII2i/406886eb0ec265c528122ac98d7375e2/tis.png'
                    }
                ]}</Meta>
                <header id="header-main">
                    {/* <!-- top header --> */}
                    <div className="top-header">
                        <div className="container header-container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <ul className="top-header-left float-left">
                                        <li className="top-menu-back">
                                            <Link to="">
                                                <span className="top-nav-icons">
                                                    <img src={growers_icon} alt="" />
                                                </span>
                                                Growers
                                            </Link>
                                        </li>
                                        <li className="top-menu-back">
                                            <Link to="">
                                                <span className="top-nav-icons">
                                                    <img src={gi_Icon} alt="" />
                                                </span>
                                                Global Ingredients
                                            </Link>
                                        </li>
                                        <li className="top-menu-back">
                                            <Link to="">
                                                <span className="top-nav-icons">
                                                    <img src={international_Icon} alt="" />
                                                </span>
                                                International
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className="float-right">
                                        <ul className="top-menu-back top-header-right">
                                            <li className="sign-in-main">
                                                <Link to="">Sign in</Link>
                                            </li>
                                            <li className="or-main">
                                                or
                                                <span />
                                            </li>
                                            <li className="sign-in-main">
                                                <Link to="">Create Account</Link>
                                            </li>
                                            <li className="sign-in-icon">
                                                <Link to="">
                                                    <img src={signInIcon} alt="" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- navigation header --> */}
                    <div className="logo-navigation">
                        <div className="container header-container">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <div
                                    className={
                                        this.state.isActive
                                            ? 'navbar-collapse show w-100 order-1 order-md-1 order-lg-0 dual-collapse2'
                                            : 'navbar-collapse collapse w-100 order-1 order-md-1 order-lg-0 dual-collapse2'
                                    }
                                >
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle pl-1"
                                                href="#"
                                                id="navbardrop"
                                                data-toggle="dropdown"
                                            >
                                                Products
                                            </a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">
                                                    Link 1
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Link 2
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Link 3
                                                </a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                id="navbardrop"
                                                data-toggle="dropdown"
                                            >
                                                Company
                                            </a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">
                                                    Link 1
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Link 2
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Link 3
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mx-auto order-0 device-menu-block">
                                    <a className="navbar-brand mx-auto" href="/holiday">
                                        <img src={bdlogo} alt="bdlogo" />
                                    </a>
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target=".dual-collapse2"
                                        onClick={this.toggleNav}
                                    >
                                        <span className="navbar-toggler-icon" />
                                    </button>
                                </div>
                                <div
                                    className={
                                        this.state.isActive
                                            ? 'navbar-collapse show w-100 order-1 order-md-1 order-lg-0 dual-collapse2'
                                            : 'navbar-collapse collapse w-100 order-1 order-md-1 order-lg-0 dual-collapse2'
                                    }
                                >
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/holiday/recipes">
                                                Recipes
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">
                                                Product Locator
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">
                                                Store
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">
                                                <img src={shoppingCartIcon} alt="" width="25" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
