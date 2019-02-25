import styles from './Button.style';
import React from 'react';
import { Button as ButtonNB } from 'native-base';
import Text from '../Text/Text';

const Button = ({ text, style, styleText, rounded, children, onPress }) => (
  <ButtonNB rounded={rounded} style={[styles.btn, style]} onPress={onPress}>
    {children}
    <Text style={[styles.btnText, styleText]} medium>{text}</Text>
  </ButtonNB>
);

export default Button;
