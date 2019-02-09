import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Arrow = ({ name, size, style, onPress, color }) => (
  <Ionicons size={size} name={name} style={style} onPress={onPress} color={color || '#000'} />
);

export default Arrow;
