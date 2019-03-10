import styles from './FridgeTab.syle';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import Text from '../Text/Text';
import { connect } from 'react-redux';
import { combineSelectors } from '../../constants/helpers';
import { refDataSelector, recipesSelector } from '../../redux/Recipe/selectors';
import { fridgeSelector } from '../../redux/User/selectors';
import { serverUrl } from '../../constants/global';
import { pink } from '../../constants/colors';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import RecipeItem from '../RecipeItem/RecipeItem';

const FridgeTab = ({ refIngredients, recipes, navigation, currentFridge }) => (
  <ScrollView>
    <View style={styles.wrapperIngredientInFridge}>
      <View style={styles.wrapperHeadIngredient}>
        <Text medium>Dans mon frigo</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FridgeIngredient')}>
          <Text style={{ color: pink }} medium>
            Ajouter aliments
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        {refIngredients.map((ingredient, i) => (
          <Thumbnail
            key={i}
            source={{ uri: `${serverUrl}/${ingredient.uri}` }}
            style={{ marginRight: 8 }}
          />
        ))}
      </ScrollView>
    </View>

    <View style={styles.wrapperRecipes}>
      <Text medium>Recettes</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {recipes
          .filter(({ ingredients }) =>
            ingredients.some(({ refId }) => currentFridge.includes(refId))
          )
          .map((recipe, i) => (
            <RecipeItem {...recipe} key={i} style={styles.recipe} />
          ))}
      </View>
    </View>
  </ScrollView>
);

export default compose(
  connect(combineSelectors(refDataSelector, recipesSelector, fridgeSelector)),
  withNavigation
)(FridgeTab);
