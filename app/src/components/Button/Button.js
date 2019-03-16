import styles from './Button.style';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text/Text';

const Button = ({ text, style, styleText, rounded, transparent, children, onPress }) => (
  <TouchableOpacity
    style={[styles.btn, rounded && styles.btnRounded, transparent && styles.btnTransparent, style]}
    onPress={onPress}
  >
    {children}
    <Text style={[styles.btnText, transparent && styles.textBtnTransparent, styleText]} medium>
      {text}
    </Text>
  </TouchableOpacity>
);

export default Button;
