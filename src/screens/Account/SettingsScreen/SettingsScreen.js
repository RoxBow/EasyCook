import styles from './SettingsScreen.style';
import React from 'react';
import { Separator, ListItem, Text, Left, Right, Body, Content, Button } from 'native-base';
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';

class SettingsScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
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
            <AntDesign
              size={26}
              name="arrowright"
              style={{ padding: 8 }}
            />
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
            <AntDesign
              size={26}
              name="arrowright"
            />
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
            <AntDesign
              size={26}
              name="arrowright"
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
              <Foundation name="clipboard-notes" size={25}/>
          </Left>
          <Body>
            <Text>Mentions légales</Text>
          </Body>
          <Right>
            <AntDesign
              size={26}
              name="arrowright"
              style={{ padding: 8 }}
            />
          </Right>
        </ListItem>
      </Content>
    );
  }
}

export default SettingsScreen;
