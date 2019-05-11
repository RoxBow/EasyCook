import styles from './EmptyRecipe.style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import { withNavigation } from 'react-navigation';

const EmptyRecipe = ({ labelCategory, category, navigation }) => (
  <TouchableOpacity
    style={styles.wrapper}
    onPress={() => navigation.navigate('CategoryRecipes', { category })}
  >
    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'lightgrey' }} />
    <Text>Ajouter un {labelCategory.toLowerCase()}</Text>

    <Icon icon="plus_rounded" size={30} />
  </TouchableOpacity>
);

export default withNavigation(EmptyRecipe);
