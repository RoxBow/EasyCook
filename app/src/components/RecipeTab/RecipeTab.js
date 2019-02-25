import styles from './RecipeTab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import RecipeItem from '../RecipeItem/RecipeItem';
import SuggestionRecipe from '../SuggestionRecipe/SuggestionRecipe';
import { compose } from 'recompose';
import { combineSelectors } from '../../constants/helpers';
import ThumbnailList from '../ThumbnailList/ThumbnailList';
import { recipesSelector, refDataSelector } from '../../redux/Recipe/selectors';

const RecipeTab = ({ recipes, refIngredients }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <ThumbnailList title="Ingrédients de saison" list={refIngredients} />
    <ThumbnailList title="La communauté" list={refIngredients} />

    <ScrollView horizontal style={{ flexDirection: 'row'}}>
      {recipes.map((recipe, i) => (
        <SuggestionRecipe {...recipe} key={i} />
      ))}
    </ScrollView>

    {recipes.map((recipe, i) => (
      <RecipeItem {...recipe} key={i} />
    ))}
  </ScrollView>
);

const mapStateToProps = combineSelectors(recipesSelector, refDataSelector);

export default compose(connect(mapStateToProps))(RecipeTab);
