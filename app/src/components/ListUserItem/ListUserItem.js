import styles from './ListUserItem.style';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import CheckBox from '../Checkbox/Checkbox';
import Text from '../Text/Text';

const ListUserItem = ({ user, isChecked, checkUser }) => (
  <TouchableOpacity onPress={checkUser} style={styles.lineUser}>
    <Text>{user.username}</Text>
    <CheckBox isChecked={isChecked} />
  </TouchableOpacity>
);

export default ListUserItem;