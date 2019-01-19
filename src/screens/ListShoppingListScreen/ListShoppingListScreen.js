import styles from './listshoppinglistscreen.style';
import React from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import { serverUrl } from '../../constants/global';
import { getToken } from '../../constants/helpers';
import Empty from '../../components/Empty/Empty';

class ListScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = async() => {
    axios
      .get(`${serverUrl}/api/user/shoppingList`, {
        headers: { Authorization: 'bearer ' + await getToken() }
      })
      .then(({ data }) => {
        this.setState({
          shoppingLists: data.shoppingList
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { shoppingLists } = this.state;

    return shoppingLists && shoppingLists.length ? (
      <ScrollView contentContainerStyle={styles.wrapper}>
        {shoppingLists.map((shoppingList, i) => (
          <ShoppingList {...shoppingList} key={i} />
        ))}
      </ScrollView>
    ) : (
      <Empty name={'liste de course'} />
    );
  }
}

export default ListScreen;
