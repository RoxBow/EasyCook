import styles from './Text.style';
import React from 'react';
import { Text as TextRN } from 'react-native';

const Text = ({ style: styleText, children, bold, medium }) => (
  <TextRN style={[styles.text, bold && styles.textBold, medium && styles.textMedium, styleText]}>
    {children}
  </TextRN>
);

export default Text;
