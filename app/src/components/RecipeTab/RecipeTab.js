import styles from './RecipeTab.style';
import React from 'react';
import { ScrollView } from 'react-native';
import SectionCategoryRecipe from '../SectionCategoryRecipe/SectionCategoryRecipeContainer';
import { CATEGORIES } from '../../constants/global';

const RecipeTab = ({  }) => (
  <ScrollView contentContainerStyle={styles.container}>

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

export default RecipeTab;
