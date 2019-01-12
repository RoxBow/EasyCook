import React from 'react';
import styles from './shoppinglistscreen.style';
import { View, Text } from 'react-native';
import { Header, Item, Input } from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
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
          <Item style={{ backgroundColor: "#E5E5E5", paddingHorizontal: 5 }}>
            <EvilIcons name="search" size={25} color="black" style={styles.iconSearch} />
            <Input placeholder="Rechercher un aliment dans la liste"  />
          </Item>
        </Header>
        <Text>Shopping List</Text>
      </View>
    );
  }
}

export default ShoppingListScreen;
