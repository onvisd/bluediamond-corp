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
import bannerRecepiesF1 from '../Layout/images/sliderOne/banner1RecipesF1.jpg';
import bannerRecepiesF2 from '../Layout/images/sliderOne/banner1RecipesF2.jpg';
import bannerRecepiesF3 from '../Layout/images/sliderOne/banner1RecipesF3.jpg';
import bannerRecepiesF2_1 from '../Layout/images/sliderTwo/banner2RecipesF1.jpg';
import bannerRecepiesF2_2 from '../Layout/images/sliderTwo/banner2RecipesF2.jpg';
import bannerRecepiesF2_3 from '../Layout/images/sliderTwo/banner2RecipesF3.jpg';
import bannerRecepiesF3_1 from '../Layout/images/sliderThree/banner3RecipesF1.jpg';
import bannerRecepiesF3_2 from '../Layout/images/sliderThree/banner3RecipesF2.jpg';
import bannerRecepiesF3_3 from '../Layout/images/sliderThree/banner3RecipesF3.jpg';
import bannerRecepiesF4_1 from '../Layout/images/sliderFour/banner4RecipesF1.jpg';
import bannerRecepiesF4_2 from '../Layout/images/sliderFour/banner4RecipesF2.jpg';
import bannerRecepiesF4_3 from '../Layout/images/sliderFour/banner4RecipesF3.jpg';

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
                    title: 'First Carousel',
                    items: [
                        {
                            title: 'A Tale of Herbs<br>& Sesame',
                            subtitle:
                                'Start off this charcuterie board with notes of the Mediterranean as garlic almonds mingle with salty feta and buttery castelvetrano olives. Zesty, flavorful pesto pops when spread atop nutty sesame nut-thins.',
                            image: { url: bannerRecepiesF1 }
                        },
                        {
                            title: 'A Tale of Herbs<br>& Sesame',
                            subtitle:
                                'To this we add vibrant sweet red pimento peppers, which are a beautiful ode to the holidays and a perfect complement to the nutty aroma of garlic and olive oil almonds. The sesame nut-thins are the perfect way to delicately balance the rich, salty flavor of thin prosciutto slices adding depth to the board.',
                            image: { url: bannerRecepiesF2 }
                        },
                        {
                            title: 'A Tale of Herbs<br>& Sesame',
                            subtitle:
                                'For a heartier component, sopressata’s sweet and savory notes are wonderfully complimented by blistered padron peppers, slightly charred to mellow the heat. The nutty aroma of sesame seeds nicely balances the honey-like sweetness of fresh figs. Add brie cheese topped with honey to balance out the flavors of this holiday charcuterie board',
                            image: { url: bannerRecepiesF3 }
                        }
                    ]
                },
                {
                    title: 'Second Carousel',
                    items: [
                        {
                            title: 'A Gift of Truffle and Seeds',
                            subtitle:
                                'The musky flavor of black truffles is the perfect contrast to the bursting sweetness of juicy winter grapes, starting off this holiday board on an unexpected note. A dollop of sweet fig jam and the nutty aroma of the multi-seed nut-thin fuse to create one delectable bite.',
                            image: { url: bannerRecepiesF2_1 }
                        },
                        {
                            title: 'A Gift of Truffle and Seeds',
                            subtitle:
                                'Next, the umami flavor of black truffle adds dimension to the slightly tart garnish of cornichons. Add in crisp winter apple slices as a refreshing counterpart to the rich, nutty aroma of the multi-seed nut-thins.',
                            image: { url: bannerRecepiesF2_2 }
                        },
                        {
                            title: 'A Gift of Truffle and Seeds',
                            subtitle:
                                'Black truffle’s richness and the pure sweetness of honeycomb then blend to create a luscious pairing. The mild, creamy flavor of burrata takes on new notes with toppings from fresh basil, cracked pepper and multi-seed nut-thins. Lastly, the complex, salty flavor of caviar and mini skewers speared with cheese cubes, salami and dried figs create even more depth of flavor in this charcuterie board.',
                            image: { url: bannerRecepiesF2_3 }
                        }
                    ]
                },
                {
                    title: 'Third Carousel',
                    items: [
                        {
                            title: 'Jolly Pink Salt-Chia Combo',
                            subtitle:
                                'Begin this holiday board with the sweet and tangy essence of dried apricots, which is enriched by a touch of pink Himalayan sea salt. With its earthy, sweet flavor, beetroot hummus is the ideal spread to enhance chia seed’s equally sweet aroma.',
                            image: { url: bannerRecepiesF3_1 }
                        },
                        {
                            title: 'Jolly Pink Salt-Chia Combo',
                            subtitle:
                                'Add in the soft and smooth texture of pickled deviled eggs to match the crunchy almonds and pops of pink sea salt. For a touch of sweetness to the board, winter squash is roasted to perfection, releasing a caramelized sweetness that pairs brilliantly with the sweet-nuttiness of chia seeds.',
                            image: { url: bannerRecepiesF3_2 }
                        },
                        {
                            title: 'Jolly Pink Salt-Chia Combo',
                            subtitle:
                                'Now a touch of sea salt is all it takes to balance the flavors of mini chili-paprika spiced mozzarella balls and red pepper skewers. Roast beef, the quintessential holiday serving, is amplified when draped over crunchy chia seed nut-thins, adding heartiness to the pairings. The sharp but sweet flavor of aged Gouda and mild flavored goat cheese enrobed in dried cranberries round out the holiday flavor of the board.',
                            image: { url: bannerRecepiesF3_3 }
                        }
                    ]
                },
                {
                    title: 'Fourth Carousel',
                    items: [
                        {
                            title: 'The Rosemary-Flax Spirit',
                            subtitle:
                                'Starting off this charcuterie board, the bold flavors of robust rosemary and sea salt are the perfect pairing to enhance the mild flavors of smoked salmon. While the earthy flavor of flax seeds and the smoky aroma of romesco create a delicious, crunchy bite.',
                            image: { url: bannerRecepiesF4_1 }
                        },
                        {
                            title: 'The Rosemary-Flax Spirit',
                            subtitle:
                                'Now two intense flavors, piney rosemary and tangy orange marmalade, mingle to create a refreshing sweet-tart fusion. Layer in the smooth texture of red Anjou pear to balance the crisp nuttiness of the flax seed nut-thins.',
                            image: { url: bannerRecepiesF4_1 }
                        },
                        {
                            title: 'The Rosemary-Flax Spirit',
                            subtitle:
                                'For an unlikely twist, herbaceous rosemary coupled with rich dark chocolate truffles makes for a delightful, bittersweet pairing. Contrast this with the explosive tartness from pomegranates. Adorned in a medley of holiday herbs, creamy goat cheese pairs wonderfully with the crunch of flax seeds, and the salty tang of marinated artichoke hearts helps to round out the textural and flavor contrasts of this holiday board.',
                            image: { url: bannerRecepiesF4_1 }
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount = () => {
        fetch('/api/holidays/recipes/content')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    carousels: res.carousels
                });
            })
            .catch((err) => console.error(err));
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
                                        {carousel.items.map((item) => (
                                            <div>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image.url}
                                                    alt="First slide"
                                                />
                                                <div className="carousel-caption d-md-block">
                                                    {item.title.split('<br>').map((x) => (
                                                        <h5>{x}</h5>
                                                    ))}
                                                    <p className="text-detail">{item.subtitle}</p>
                                                    <div className="carousel-img-download">
                                                        <img src={productImageOne} alt="" />
                                                        <Link to="http://a.co/fdIGaVX">
                                                            Start Your Cart
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </Layout>
        );
    }
}
