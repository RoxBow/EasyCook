import styles from './FridgeIngredient.style';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';

const FridgeIngredient = ({ id, name, uri, selected, selectIngredient }) => (
  <TouchableOpacity onPress={() => selectIngredient(id)} style={[styles.wrapper, selected && styles.wrapperSelected]}>
    <Image source={{ uri: `${serverUrl}/${uri}` }} style={{ width: 50, height: 50 }} />
    <Text style={[styles.name, selected && styles.nameSelected]} bold={selected}>
      {name}
    </Text>
  </TouchableOpacity>
);

export default FridgeIngredient;
