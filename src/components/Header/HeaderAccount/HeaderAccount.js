import React from 'react';
import { connect } from 'react-redux';
import { Header, Left, Body, Right, Text } from 'native-base';
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { requestLogout } from '../../../redux/User/actions';
import { withNavigation } from 'react-navigation';
import { pink } from '../../../constants/colors';

const HeaderAccount = ({ username, requestLogout, navigation }) => (
  <Header style={{ height: 200, borderBottomWidth: 0 }}>
    <Left>
      <Entypo name="bell" size={35} style={{ marginHorizontal: 20 }} />
    </Left>
    <Body>
      <Text>Bonjour</Text>
      <Text>{username}</Text>
      <FontAwesome
        name="edit"
        onPress={() => navigation.navigate('EditUser')}
        size={25}
        color={pink}
      />
    </Body>
    <Right>
      <Ionicons name="md-settings" size={35} onPress={() => navigation.navigate('Settings')} />
      <MaterialCommunityIcons
        name="logout"
        size={35}
        style={{ marginHorizontal: 20 }}
        onPress={requestLogout}
      />
    </Right>
  </Header>
);

const mapStateToProps = state => ({
  username: state.user.info.username
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
