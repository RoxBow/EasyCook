import styles from './recipecalendar.style';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

const RecipeCalendar = ({ name, image }) => (
  <TouchableOpacity
    style={{
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#000',
      shadowOpacity: 0.3,
      elevation: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 10,
      marginVertical: 10
    }}
  >
    <Image style={{width: 60, height: 60, borderRadius: 30}} source={{ uri: `${serverUrl}/${image.uri}` }} />
    <Text>{name}</Text>
    <Icon icon="arrow_back" size={20} />
  </TouchableOpacity>
);


export default RecipeCalendar;
