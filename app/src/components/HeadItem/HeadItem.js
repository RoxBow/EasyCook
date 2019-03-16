import styles from './HeadItem.style';
import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';
import ProposedBy from '../ProposedBy/ProposedBy';

const HeadItem = ({ title, category, creator }) => (
  <View style={styles.wrapper}>
    <Text style={styles.category} medium>{category}</Text>
    <Text style={styles.title} medium>{title}</Text>
    <ProposedBy creator={creator} />
  </View>
);

export default HeadItem;