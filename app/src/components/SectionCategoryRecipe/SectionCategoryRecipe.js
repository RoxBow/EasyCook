import React from 'react';
import { View, ScrollView } from 'react-native';
import Text from '../Text/Text';
import RecipeItem from '../RecipeItem/RecipeItem';
import SuggestionRecipe from '../SuggestionRecipe/SuggestionRecipe';

const SectionCategoryRecipe = ({ title, recipes, category, isSuggestion }) => (
  <View>
    <Text medium>{title}</Text>
    <ScrollView horizontal>
      {!isSuggestion
        ? recipes
            .filter(({ category: categoryRecipe }) => categoryRecipe === category)
            .map((recipe, i) => <RecipeItem {...recipe} key={i} />)
        : recipes.map((recipe, i) => <SuggestionRecipe {...recipe} key={i} />)}
    </ScrollView>
  </View>
);

export default SectionCategoryRecipe;
