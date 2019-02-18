import styles from './listingredient.style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CheckBox from '../Checkbox/Checkbox';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { toggleValidAliment } from '../../redux/ShoppingList/actions';
import { Thumbnail } from 'native-base';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';

const ListIngredient = ({ ingredients, isValidate, toggleValidAliment, idShoppingList }) =>
  ingredients.map(({ name, quantity, unity, refId, user }, i) => (
    <TouchableOpacity
      style={styles.line}
      key={i}
      onPress={() => toggleValidAliment(idShoppingList, refId)}
    >
      <View style={styles.wrapperName}>
        <CheckBox isChecked={isValidate} />
        <Text key={i} style={[styles.textIngredient, isValidate && styles.textValidate]}>
          {name}
        </Text>
      </View>
      <View style={styles.wrapperName}>
        <Text style={{ marginRight: 10 }}>
          {quantity} {unity}
        </Text>
        {user && <Thumbnail small source={{ uri: `${serverUrl}/${user.avatar.uri}` }} />}
      </View>
    </TouchableOpacity>
  ));

const mapDispatchToProps = dispatch => ({
  toggleValidAliment: (idShoppingList, refId) => dispatch(toggleValidAliment(idShoppingList, refId))
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(ListIngredient)
);
