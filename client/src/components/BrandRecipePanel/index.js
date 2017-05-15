import React, {Component, PropTypes} from 'react';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';
import Button from '../Button';
import styles from './styles.module.css';

import RecipeCard from '../RecipeCard';

export default class BrandRecipePanel extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        recipes: PropTypes.array.isRequired,
        theme: PropTypes.string.isRequired
    }

    state = {
        activeTab: 0
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeTab: currentIndices[0]
        }));
    }

    render() {
        const {activeTab} = this.state;
        const {recipes, theme, name} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <h2>Try out these delicious recipes:</h2>
                    <div className={styles.recipeCards}>
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                title={recipe.name}
                                cookTime={recipe.cookTime}
                                difficulty={recipe.difficulty}
                                recipe={recipe.slug}
                                imageFile={recipe.cardBackgroundImage.file.url}
                            />
                        ))}
                    </div>
                    <ViewPager className={styles.recipeCardsMobile}>
                        <Frame>
                            <Track
                                viewsToShow={1}
                                infinite
                                onViewChange={this.handleSwipe}
                                style={{display: 'flex'}}
                                ref={(track) => {
                                    this.carouselTrack = track;
                                }}
                            >
                                {recipes.map((recipe) => (
                                    <View style={{flex: '1'}} key={recipe._id}>
                                        <RecipeCard
                                            title={recipe.name}
                                            cookTime={recipe.cookTime}
                                            difficulty={recipe.difficulty}
                                            recipe={recipe.slug}
                                            imageFile={recipe.cardBackgroundImage.file.url}
                                        />
                                    </View>
                                ))}
                            </Track>
                        </Frame>
                    </ViewPager>
                    <div className={styles.tabs}>
                        {recipes.map((recipe, idx) => (
                            <div
                                key={recipe._id}
                                className={classnames(styles.tab, {
                                    [styles.tabActive]: activeTab === idx
                                })}
                            />
                        ))}
                    </div>
                    <Button theme={theme} href={`/recipes?filter=${name}`}>
                        See more examples
                    </Button>
                </div>
            </div>
        );
    }
}
