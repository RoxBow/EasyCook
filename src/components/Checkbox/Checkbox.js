import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { greenApp, greyApp } from '../../constants/colors';

export const CheckBox = ({ isChecked, size }) =>
  isChecked ? (
    <MaterialCommunityIcons name="circle-slice-8" size={size || 25} color={greenApp} />
  ) : (
    <MaterialCommunityIcons name="circle-outline" size={25} color={greyApp} />
  );

export default CheckBox;
