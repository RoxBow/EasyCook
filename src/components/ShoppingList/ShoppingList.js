import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './shoppinglist.style';
import { withNavigation } from 'react-navigation';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.redirectToShoppingList = this.redirectToShoppingList.bind(this);
  }

  remainingAliments(ourAliments, aliments) {
    ourAliments = (ourAliments && ourAliments.length) || 0;

    const remainingAliment = aliments.length - ourAliments;

    if(remainingAliment > 1) {
      return `${remainingAliment} aliments restants`;
    } else if(remainingAliment === 0){
      return "COMPLET";
    }

    return `${remainingAliment} aliment restant`;
  }

  redirectToShoppingList() {
    const { navigation, id } = this.props;
    
    navigation.navigate('ShoppingList', {
      info: this.props,
    });
  }

  render() {
    const { name, dateMax, aliments, ourAliments, sharedUers } = this.props;

    return (
      <TouchableOpacity style={styles.wrapper} onPress={this.redirectToShoppingList}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dateMax}>{dateMax}</Text>
        <Text style={styles.remainingAliments}>
          {this.remainingAliments(ourAliments, aliments)}
        </Text>
        <View>
          <Text>Shared users</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ShoppingList);
