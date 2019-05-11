import styles from './HeaderAccount.style';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Thumbnail } from 'native-base';
import { infoSelector } from '../../../redux/User/selectors';
import { withNavigation } from 'react-navigation';
import { serverUrl } from '../../../constants/global';
import { combineSelectors } from '../../../constants/helpers';
import Text from '../../Text/Text';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';

const HeaderAccount = ({ info, navigation }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingVertical: 30,
      paddingHorizontal: 15
    }}
  >
    <ButtonIcon icon="notification" size={28} />

    <View style={{ alignItems: 'center' }}>
      <Thumbnail large source={{ uri: `${serverUrl}/${info.avatar.uri}` }} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.username} bold>
          {info.username}
        </Text>
        <ButtonIcon icon="edit" size={22} onPress={() => navigation.navigate('EditUser')} />
      </View>
    </View>
    <ButtonIcon
      icon="setting"
      size={28}
      onPress={() => navigation.navigate('Settings')}
    />
  </View>
);



export default withNavigation(
  connect(
    combineSelectors(infoSelector)
  )(HeaderAccount)
);
