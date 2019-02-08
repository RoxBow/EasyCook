import styles from './thumbnaillist.style';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import { serverUrl } from '../../constants/global';

const ThumbnailList = ({ title, list }) => (
  <View style={styles.wrapper}>
    {title && <Text style={styles.title}>{title}</Text>}
    <ScrollView horizontal>
      {list.map((element, i) => (
        <Thumbnail key={i} source={{ uri: `${serverUrl}/${element.uri}` }} />
      ))}
    </ScrollView>
  </View>
);

export default ThumbnailList;
