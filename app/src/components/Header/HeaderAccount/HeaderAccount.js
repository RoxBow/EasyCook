import styles from './HeaderAccount.style';
import React from 'react';
import { connect } from 'react-redux';
import { Header, Left, Body, Right, Text, Thumbnail, Button } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { requestLogout } from '../../../redux/User/actions';
import { withNavigation } from 'react-navigation';
import { pink } from '../../../constants/colors';
import { serverUrl } from '../../../constants/global';
import Icon from '../../Icon/Icon';

const HeaderAccount = ({ info, requestLogout, navigation }) => (
  <Header style={styles.wrapper}>
    <Left style={styles.wrapperIcon}>
      <Button transparent>
        <Icon icon="notification" size={28} />
      </Button>
    </Left>
    <Body>
      <Thumbnail large source={{uri: `${serverUrl}/${info.avatar.uri}`}} />
      <Text>{info.username}</Text>
      <FontAwesome
        name="edit"
        onPress={() => navigation.navigate('EditUser')}
        size={25}
        color={pink}
      />
    </Body>
    <Right style={styles.wrapperIcon}>
      <Button transparent onPress={() => navigation.navigate('Settings')}>
        <Icon icon="setting" size={28} />
      </Button>
      <Button transparent onPress={requestLogout}>
        <Icon icon="logout" size={28} />
      </Button>
    </Right>
  </Header>
);

const mapStateToProps = state => ({
  info: state.user.info
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  requestLogout: () => dispatch(requestLogout(navigation))
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderAccount)
);
