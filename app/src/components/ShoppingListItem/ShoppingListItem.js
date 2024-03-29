import styles from './shoppinglistitem.style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ActionSheet } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { togglePin } from '../../redux/ShoppingList/actions';
import { formatDateShort } from '../../constants/helpers';
import ListAvatar from '../ListAvatar/ListAvatar';
import Text from '../Text/Text';

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.redirectToShoppingListItem = this.redirectToShoppingListItem.bind(this);
    this.actionShoppingList = this.actionShoppingList.bind(this);
    this.isOutDated = this.isOutDated.bind(this);
  }

  renderRemainingAliments() {
    const { ingredients } = this.props;

    const ingredientsValidate = ingredients.filter(({ isValidate }) => isValidate);
    const ingredientsNotValidate = ingredients.filter(({ isValidate }) => !isValidate);
    const nbrIngredients = ingredients.length;

    if (ingredientsNotValidate.length >= 1) {
      return `${ingredientsNotValidate.length} aliments restants`;
    } else if (ingredientsValidate.length === nbrIngredients && nbrIngredients > 0) {
      return 'COMPLET';
    } else if (nbrIngredients === 0) {
      return 'Liste vide';
    }

    return `${nbrIngredients} aliment restant`;
  }

  redirectToShoppingListItem() {
    const dataShoppingList = this.props;

    this.props.navigation.navigate('ShoppingListItem', {
      idShoppingList: dataShoppingList._id,
      name: dataShoppingList.name
    });
  }

  actionShoppingList(action) {
    const { togglePin, _id } = this.props;

    if (action === 'Épingler' || action === 'Désépingler') {
      togglePin(_id);
    }
  }

  isOutDated(date) {
    const now = new Date();
    date = new Date(date);

    return date < now;
  }

  render() {
    const { name, maxDate, isPin, users } = this.props;
    const isPinLabel = isPin ? 'Désépingler' : 'Épingler';

    const BUTTONS = [isPinLabel, 'Ajouter un membre', 'Ajouter un aliment', 'Annuler'];

    const CANCEL_INDEX = 4;

    return (
      <TouchableOpacity style={styles.wrapper} onPress={this.redirectToShoppingListItem}>
        <View style={styles.wrapperTextIcon}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} bold>
              {name}
            </Text>
            {maxDate && <Text style={[this.isOutDated(maxDate) ? styles.outdated : styles.validDate]}>Jusqu'au {formatDateShort(maxDate)}</Text>}
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
                  title: name
                },
                buttonIndex => {
                  this.actionShoppingList(BUTTONS[buttonIndex]);
                }
              );
            }}
          />
        </View>
        <View style={{ borderTopWidth: 1, paddingTop: 8, borderColor: 'lightgrey' }}>
          <Text style={styles.shareWith}>Partagé avec {users.length} membre(s)</Text>
          <ListAvatar listUser={users} />
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
