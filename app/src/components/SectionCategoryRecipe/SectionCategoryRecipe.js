import styles from './SectionCategoryRecipe.style';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../Text/Text';
import RecipeItem from '../RecipeItem/RecipeItem';
import SuggestionRecipe from '../SuggestionRecipe/SuggestionRecipe';
import { withNavigation } from 'react-navigation';

const SectionCategoryRecipe = ({ title, recipes, category, isSuggestion, navigation }) => (
  <View style={styles.wrapperSection}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15 }}>
      <Text style={styles.titleSection} medium>
        {title}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('CategoryRecipes', { category })}>
        <Text style={styles.seeMoreText} medium>Tout voir</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal>
      {!isSuggestion
        ? recipes
            .filter(({ category: categoryRecipe }) => categoryRecipe === category)
            .slice(0, 5)
            .map((recipe, i) => <RecipeItem {...recipe} key={i} style={styles.recipe} />)
        : recipes.map((recipe, i) => <SuggestionRecipe {...recipe} key={i} />)}
    </ScrollView>
  </View>
);

export default withNavigation(SectionCategoryRecipe);
