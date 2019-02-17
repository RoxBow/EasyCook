import styles from './Button.style';
import React from 'react';
import { Button as ButtonNB, Text } from 'native-base';

const Button = ({ text, style, styleText, rounded, children, onPress }) => (
  <ButtonNB rounded={rounded} style={[styles.btn, style]} onPress={onPress}>
    {children}
    <Text style={[styles.stylesText, styleText]}>{text}</Text>
  </ButtonNB>
);

export default Button;
