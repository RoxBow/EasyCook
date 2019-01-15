import styles from './shoppinglistscreen.style';
import React from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { Header, Item, Input } from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import { serverUrl } from '../../constants/global';

class ShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount(){
    const { id } = this.props;

    axios
      .get(`${serverUrl}/shoppingList/${id}`)
      .then(({ data }) => {
        this.setState({
          data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View>
        <Header searchBar rounded transparent>
          <Item style={styles.item}>
            <EvilIcons name="search" size={25} color="#000" style={styles.iconSearch} />
            <Input placeholder="Rechercher un aliment dans la liste" />
          </Item>
        </Header>
        <Text>Shopping List</Text>
      </View>
    );
  }
}

export default ShoppingListScreen;
