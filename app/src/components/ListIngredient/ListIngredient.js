import styles from './listingredient.style';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CheckBox from '../Checkbox/Checkbox';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { toggleValidAliment } from '../../redux/ShoppingList/actions';

const ListIngredient = ({ ingredients, isValidate, toggleValidAliment, idShoppingList }) =>
  ingredients.map(({ name, id }, i) => (
    <TouchableOpacity
      style={styles.line}
      key={i}
      onPress={() => toggleValidAliment(idShoppingList, id)}
    >
      <CheckBox isChecked={isValidate} />
      <Text key={i} style={[styles.textIngredient, isValidate && styles.textValidate]}>
        {name}
      </Text>
    </TouchableOpacity>
  ));

const mapDispatchToProps = (dispatch, { navigation }) => ({
  toggleValidAliment: (idShoppingList, id) =>
    dispatch(toggleValidAliment(idShoppingList, id, navigation))
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(ListIngredient)
);
