import styles from './gooddeal.style';
import React from 'react';
import { View, Text } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import IconStar from '../Icons/IconStar';

const GoodDeal = ({ storeName, description, like, isFav }) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      <Text style={styles.title}>{storeName}</Text>
      <Text style={styles.time}>Y aller</Text>
    </View>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.footer}>
      <View style={styles.wrapperLike}>
        <Icon size={20} name="thumbs-o-up" style={styles.iconLike} />
      <Text>
        {like}
      </Text>
      </View>
      <IconStar size={20} isFill={isFav} color="#000" />
    </View>
  </View>
);

export default GoodDeal;
