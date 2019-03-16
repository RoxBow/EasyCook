import styles from './SettingsScreen.style';
import React from 'react';
import { Separator, ListItem, Left, Right, Body, Content, Button } from 'native-base';
import Arrow from '../../../components/Icons/IconArrow';
import { connect } from 'react-redux';
import { requestLogout, requestDeleteAccount } from '../../../redux/User/actions';
import { Entypo, Feather, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { ARROW } from '../../../constants/global';
import Icon from '../../../components/Icon/Icon';
import Text from '../../../components/Text/Text';

class SettingsScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { requestLogout, requestDeleteAccount } = this.props;

    return (
      <Content>
        <Separator bordered>
          <Text>Notifications</Text>
        </Separator>
        <ListItem icon>
          <Left>
            <Entypo name="bell" size={25} />
          </Left>
          <Body>
            <Text>Gérer les notifications</Text>
          </Body>
          <Right>
            <Arrow size={26} name={ARROW.RIGHT} />
          </Right>
        </ListItem>
        <Separator bordered>
          <Text>Divers</Text>
        </Separator>
        <ListItem icon>
          <Left>
            <Feather name="help-circle" size={25} />
          </Left>
          <Body>
            <Text>Aide</Text>
          </Body>
          <Right>
            <Arrow size={26} name={ARROW.RIGHT} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <MaterialCommunityIcons name="message-reply-text" size={25} />
          </Left>
          <Body>
            <Text>A propos</Text>
          </Body>
          <Right>
            <Arrow size={26} name={ARROW.RIGHT} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Foundation name="clipboard-notes" size={25} />
          </Left>
          <Body>
            <Text>Mentions légales</Text>
          </Body>
          <Right>
            <Arrow size={26} name={ARROW.RIGHT} />
          </Right>
        </ListItem>
        <Button
          onPress={requestLogout}
          style={{
            borderColor: '#000',
            backgroundColor: '#fff',
            alignSelf: 'center',
            paddingHorizontal: 10,
            marginTop: 50,
            shadowOffset: { width: 1, height: 1 },
            shadowColor: '#000',
            shadowOpacity: 0.3,
            elevation: 2,
          }}
        >
          <Icon icon="logout" size={22} />
          <Text style={{ color: '#000' }}>Me déconnecter</Text>
        </Button>
        <Button
          onPress={requestDeleteAccount}
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'center',
            marginTop: 20
          }}
        >
          <Icon icon="delete_account" size={35} />
          <Text style={{ color: 'red' }}>Supprimer mon compte</Text>
        </Button>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  requestLogout: () => dispatch(requestLogout(navigation)),
  requestDeleteAccount: () => dispatch(requestDeleteAccount(navigation))
});

export default connect(null, mapDispatchToProps)(SettingsScreen);
