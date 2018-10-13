import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
    render() {
        return (
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
                                                <img
                                                    src="images/growers-icon.png"
                                                    alt=""
                                                />
                                            </span>
                                            Growers
                                        </Link>
                                    </li>
                                    <li className="top-menu-back">
                                        <Link to="">
                                            <span className="top-nav-icons">
                                                <img
                                                    src="images/GI-Icon.png"
                                                    alt=""
                                                />
                                            </span>
                                            Global Ingredients
                                        </Link>
                                    </li>
                                    <li className="top-menu-back">
                                        <Link to="">
                                            <span className="top-nav-icons">
                                                <img
                                                    src="images/International-Icon.png"
                                                    alt=""
                                                />
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
                                                <img
                                                    src="images/sign-in-icon.png"
                                                    alt=""
                                                />
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
                            <div className="navbar-collapse collapse w-100 order-1 order-md-1 order-lg-0 dual-collapse2">
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
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Link 1
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Link 2
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
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
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Link 1
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Link 2
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Link 3
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="mx-auto order-0 device-menu-block">
                                <a
                                    className="navbar-brand mx-auto"
                                    href="index.html"
                                >
                                    <img src="images/bd-logo.png" alt="" />{' '}
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target=".dual-collapse2"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                            </div>
                            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/recipes"
                                        >
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
                                            <img
                                                src="images/Shopping-Cart-Icon.png"
                                                alt=""
                                                width="25"
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
