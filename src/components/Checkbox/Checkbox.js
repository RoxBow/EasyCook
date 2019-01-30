import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pink } from '../../constants/colors';

export const CheckBox = ({ isChecked, size }) => (
  <MaterialCommunityIcons
    name={isChecked ? 'circle-slice-8' : 'circle-outline'}
    size={size || 25}
    color={pink}
  />
);

export default CheckBox;
