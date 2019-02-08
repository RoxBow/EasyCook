import styles from './ListAvatar.style';
import React from 'react';
import { View } from 'react-native';
import { Thumbnail } from 'native-base';
import { serverUrl } from '../../constants/global';

const ListAvatar = ({ listUser }) => (
  <View style={ styles.wraperListAvatar }>
    {listUser.map(({ avatar }, i) => (
      <Thumbnail
        small
        key={i}
        source={{ uri: `${serverUrl}/${avatar.uri}` }}
        style={[i !== 0 && styles.thumbnail]}
      />
    ))}
  </View>
);

export default ListAvatar;
