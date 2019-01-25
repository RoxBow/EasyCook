import styles from './listingredient.style';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CheckBox from '../Checkbox/Checkbox';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { toggleValidAliment } from '../../redux/ShoppingList/actions';

const ListIngredient = ({
  title,
  ingredients,
  isValidate,
  toggleValidAliment,
  idShoppingList
}) => (
  <View style={styles.wrapperIngredients}>
    <Text style={styles.title}>{title}</Text>
    {ingredients.map(({ name, id }, i) => (
      <TouchableOpacity
        style={styles.line}
        key={i}
        onPress={() => toggleValidAliment(idShoppingList, id)}
      >
        <CheckBox isChecked={isValidate} />
        <Text key={i} style={isValidate && styles.textValidate}>
          {name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

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
