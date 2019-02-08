import styles from './addingredientscreen.style';
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Header, Button } from 'native-base';
import { addIngredientToShoppingListItem } from '../../../redux/ShoppingList/actions';

class AddIngredientScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addIngredientToSoppingList = this.addIngredientToSoppingList.bind(this);
  }

  goToShoppingListItem() {
    this.props.navigation.pop(2);
  }

  addIngredientToSoppingList() {
    const {
      id: idIngredient,
      idShoppingList,
    } = this.props.navigation.state.params;

    const { addIngredientToShoppingListItem } = this.props;

     addIngredientToShoppingListItem(idIngredient, idShoppingList);
  }

  render() {
    const { nameShoppingList } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Header>
          <AntDesign
            name="closecircle"
            size={25}
            color="#000"
            onPress={() => this.goToShoppingListItem()}
          />
        </Header>
        <Text>Saisir une quantité</Text>
        <Button onPress={this.addIngredientToSoppingList}>
          <Text>Ajouter à la liste {nameShoppingList}</Text>
        </Button>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addIngredientToShoppingListItem: (idIngredient, idShoppingList) =>
    dispatch(addIngredientToShoppingListItem(idIngredient, idShoppingList, navigation))
});

export default connect(
  null,
  mapDispatchToProps
)(AddIngredientScreen);
