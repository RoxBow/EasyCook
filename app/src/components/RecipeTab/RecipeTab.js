import styles from './RecipeTab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import SuggestionRecipe from '../SuggestionRecipe/SuggestionRecipe';
import { compose } from 'recompose';
import ThumbnailList from '../ThumbnailList/ThumbnailList';
import SectionCategoryRecipe from '../SectionCategoryRecipe/SectionCategoryRecipeContainer';
import Text from '../Text/Text';
import { refDataSelector } from '../../redux/Recipe/selectors';
import { CATEGORIES } from '../../constants/global';

const RecipeTab = ({ recipes, refIngredients }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <ThumbnailList title="Ingrédients de saison" list={refIngredients} />
    <ThumbnailList title="La communauté" list={refIngredients} />

    <SectionCategoryRecipe
      title="Suggestions du moment"
      category={CATEGORIES[0].value}
      isSuggestion={true}
    />

    <SectionCategoryRecipe title="Petit déjeuner" category={CATEGORIES[0].value} />
    <SectionCategoryRecipe title="Déjeuner" category={CATEGORIES[1].value} />
    <SectionCategoryRecipe title="Goûter" category={CATEGORIES[2].value} />
    <SectionCategoryRecipe title="Dîner" category={CATEGORIES[3].value} />
  </ScrollView>
);

export default compose(connect(refDataSelector))(RecipeTab);
