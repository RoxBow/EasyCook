import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const IconStart = ({ isFill, size, color, style, onPress }) => (
  <FontAwesome
    name={isFill ? 'star' : 'star-o'}
    size={size}
    color={color || '#000'}
    style={style}
    onPress={onPress}
  />
);

export default IconStart;
