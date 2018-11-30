import React, { Component } from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import Layout from '../Layout';
import './slick.css';
import './slick-theme.css';
import Popup from '../Popup';

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
                    title: '',
                    html: ''
                }
            ],
            isOpen: false,
            popup: `<div className="recipes-video-modal">
             <iframe
                 width="100%"
                 height="400"
                 src="https://www.youtube.com/embed/UFWoGRQrIws"
                 frameborder="0"
                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                 allowfullscreen
             />
         </div>`
        };
    }

    openPopup = () => {
        this.setState({
            isOpen: true,
        });
    };

    closePopup = () => {
        this.setState({
            isOpen: false,
        });
    };

    componentDidMount = () => {
        fetch('/api/holidays/recipes/content')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    carousels: res.carousels,
                    popup: res.popups[0].html
                });
            })
            .catch((err) => console.error(err));

        // handler called by recipe carousel button
        window.showRecipesPopup = this.openPopup;
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
                                        {carousel.html
                                            .split('<!-- break-slide  -->')
                                            .map((slideHtml) => (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: slideHtml
                                                    }}
                                                />
                                            ))}
                                    </Slider>
                                </div>
                            </div>
                        ))}
                    </section>
                    <Popup show={this.state.isOpen} onClose={this.closePopup}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.popup }} />
                    </Popup>
                </div>
            </Layout>
        );
    }
}
