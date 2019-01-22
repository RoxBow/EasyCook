import styles from './shoppinglistitem.style';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.redirectToShoppingListItem = this.redirectToShoppingListItem.bind(this);
  }

  renderRemainingAliments() {
    const { ingredients } = this.props;

    const remainingAliment = ingredients.length;

    if (remainingAliment > 1) {
      return `${remainingAliment} ingredients restants`;
    } else if (remainingAliment === 0) {
      return 'COMPLET';
    }

    return `${remainingAliment} ingredients restant`;
  }

  redirectToShoppingListItem() {
    const { navigation, ingredients } = this.props;

    const dataShoppingList = { ...this.props, remainingAliment: ingredients.length };

    navigation.navigate('ShoppingListItem', {
      ...dataShoppingList
    });
  }

  render() {
    const { name, dateMax, sharedUers } = this.props;

    return (
      <TouchableOpacity style={styles.wrapper} onPress={this.redirectToShoppingListItem}>
        <Text style={styles.name}>{name}</Text>
        {/* <Text style={styles.dateMax}>{dateMax}</Text> */}
        <Text style={styles.remainingAliments}>{this.renderRemainingAliments()}</Text>
        <View>
          <Text>Shared users</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ShoppingListItem);
