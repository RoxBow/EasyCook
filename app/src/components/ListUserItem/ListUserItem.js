import styles from './ListUserItem.style';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import CheckBox from '../Checkbox/Checkbox';

const ListUserItem = ({ user, isChecked, checkUser }) => (
  <TouchableOpacity onPress={checkUser} style={styles.lineUser}>
    <Text>{user.username}</Text>
    <CheckBox isChecked={isChecked} />
  </TouchableOpacity>
);

export default ListUserItem;