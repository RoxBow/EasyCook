import styles from './Mark.style';
import React from 'react';
import { View } from 'react-native';

const Mark = ({ isSelected }) => <View style={[styles.mark, isSelected && styles.selectedMark]} />;

export default Mark;
