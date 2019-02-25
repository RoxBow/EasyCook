import styles from './HeadItem.style';
import React from 'react';
import Text from '../Text/Text';
import ProposedBy from '../ProposedBy/ProposedBy';
import { View } from 'react-native';

const HeadItem = ({ title, category, creator }) => (
  <View style={styles.wrapper}>
    <Text style={styles.category} medium>{category}</Text>
    <Text style={styles.title} medium>{title}</Text>
    <ProposedBy creator={creator} />
  </View>
);

export default HeadItem;