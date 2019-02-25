import styles from './ProposedBy.style';
import React from 'react';
import Text from '../Text/Text';
import { Thumbnail } from 'native-base';
import { View } from 'react-native';
import { serverUrl } from '../../constants/global';

const ProposedBy = ({ creator }) => (
  <View style={styles.wrapperProposedby}>
    <Thumbnail
      small
      source={{ uri: `${serverUrl}/${creator.avatar.uri}` }}
      style={styles.thumnailCreator}
    />
    <Text style={styles.proposedBy}>proposée par {creator.username}</Text>
  </View>
);

export default ProposedBy;
