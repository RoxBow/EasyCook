import styles from './shoppinglistitem.style';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ActionSheet } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { togglePin } from '../../redux/ShoppingList/actions';

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.redirectToShoppingListItem = this.redirectToShoppingListItem.bind(this);
    this.actionShoppingList = this.actionShoppingList.bind(this);
  }

  renderRemainingAliments() {
    const { ingredients } = this.props;

    const ingredientsValidate = ingredients.filter(({ isValidate }) => isValidate);
    const ingredientsNotValidate = ingredients.filter(({ isValidate }) => !isValidate);
    const nbrIngredients = ingredients.length;

    if (ingredientsNotValidate.length > 1) {
      return `${ingredientsNotValidate.length} ingredients restants`;
    } else if(ingredientsValidate.length === ingredientsNotValidate.length && nbrIngredients > 1){
      return "COMPLET";
    } else if (nbrIngredients === 0) {
      return "Liste vide";
    }

    return `${nbrIngredients} ingredients restant`;
  }

  redirectToShoppingListItem() {
    const { navigation, ingredients } = this.props;

    const dataShoppingList = { ...this.props, remainingAliment: ingredients.length };

    navigation.navigate('ShoppingListItem', {
      ...dataShoppingList
    });
  }

  actionShoppingList(action) {
    const { togglePin, _id } = this.props;

    if (action === 'Épingler' || action === 'Désépingler') {
      togglePin(_id);
    }
  }

  render() {
    const { name, dateMax, sharedUers, isPin } = this.props;
    const isPinLabel = isPin ? 'Désépingler' : 'Épingler';

    const BUTTONS = [isPinLabel, 'Ajouter un membre', 'Ajouter un aliment', 'Fermer'];

    const CANCEL_INDEX = 4;

    return (
      <TouchableOpacity style={styles.wrapper} onPress={this.redirectToShoppingListItem}>
        <View style={styles.wrapperTextIcon}>
          <View>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{name}</Text>
            {dateMax && <Text style={styles.dateMax}>{dateMax.toString().substr(4, 12)}</Text>}
            <Text style={styles.remainingAliments}>{this.renderRemainingAliments()}</Text>
          </View>

          <Entypo
            name="dots-three-vertical"
            size={20}
            color="#000"
            onPress={() => {
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: `Actions ${name}`
                },
                buttonIndex => {
                  this.actionShoppingList(BUTTONS[buttonIndex]);
                }
              );
            }}
          />
        </View>
        <View>
          <Text>Shared users</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  togglePin: id => dispatch(togglePin(id))
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(ShoppingListItem)
);
