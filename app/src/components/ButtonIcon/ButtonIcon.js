import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';

const ButtonIcon = ({ style, onPress, icon, size }) => (
  <TouchableOpacity style={[{ backgroundColor: 'transparent', marginHorizontal: 5}, style]} onPress={onPress}>
    <Icon icon={icon} size={size} />
  </TouchableOpacity>
);

export default ButtonIcon;
