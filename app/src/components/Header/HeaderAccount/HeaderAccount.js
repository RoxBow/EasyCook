import React from 'react';
import { connect } from 'react-redux';
import { Header, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { requestLogout } from '../../../redux/User/actions';
import { withNavigation } from 'react-navigation';
import { pink } from '../../../constants/colors';
import { serverUrl } from '../../../constants/global';


const HeaderAccount = ({ info, requestLogout, navigation }) => (
  <Header style={{ height: 200, borderBottomWidth: 0, backgroundColor: "#fff" }}>
    <Left>
      <Entypo name="bell" size={35} style={{ marginHorizontal: 20 }} />
    </Left>
    <Body>
      <Thumbnail large source={{uri: `${serverUrl}/${info.avatar.uri}`}} />
      <Text>Bonjour</Text>
      <Text>{info.username}</Text>
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
