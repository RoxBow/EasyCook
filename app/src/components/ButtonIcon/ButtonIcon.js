import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';

const ButtonIcon = ({ style, onPress, icon, size, disabled = false }) => (
  <TouchableOpacity
    style={[{ backgroundColor: 'transparent', marginHorizontal: 5 }, style]}
    onPress={onPress}
    disabled={disabled}
  >
    <Icon icon={icon} size={size} />
  </TouchableOpacity>
);

export default ButtonIcon;
