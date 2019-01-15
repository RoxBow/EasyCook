import styles from './listshoppinglistscreen.style';
import React from 'react';
import axios from 'axios';
import { ScrollView, Button,Text } from 'react-native';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import { serverUrl } from '../../constants/global';

class ListScreen extends React.Component {
  constructor(){
    super();

    this.state = {}
  }
  
  componentDidMount() {
    axios
      .get(`${serverUrl}/shoppingLists`)
      .then(({ data }) => {
        this.setState({
          shoppingLists: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { shoppingLists } = this.state;

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
          {shoppingLists && shoppingLists.map((shoppingList, i) => (
            <ShoppingList {...shoppingList} key={i} />
          ))}
        </ScrollView>
    );
  }
}

export default ListScreen;
