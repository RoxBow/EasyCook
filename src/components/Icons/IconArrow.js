import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Arrow = ({ name, size, style, onPress }) => (
  <Ionicons size={size} name={name} style={style} onPress={onPress} />
);

export default Arrow;
