import styles from './recipecalendar.style';
import React from 'react';
import { View, Image } from 'react-native';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';

const RecipeCalendar = ({ name, uri, type }) => (
  <View style={styles.container}>
    <Image style={{width: '100%', height:'100%'}} source={{ uri: `${serverUrl}/assets/${uri}` }} />
    <Text style={styles.name}>{name}</Text>
  </View>
);

export default RecipeCalendar;
