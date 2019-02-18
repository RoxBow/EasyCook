import styles from './shoppinglistitemscreen.style';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Item, Input, Button, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import ListIngredient from '../../../components/ListIngredient/ListIngredient';
import {
  getValidateIngredientsFromId,
  getIngredientsFromKind,
  isArrayFill
} from '../../../constants/helpers';
import Accordeon from '../../../components/Accordeon/Accordeon';
import { currentShoppingListSelector } from '../../../redux/ShoppingList/selectors';
import { serverUrl } from '../../../constants/global';
import Icon from '../../../components/Icon/Icon';

class ShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addAliment = this.addAliment.bind(this);
    this.openModalAddUser = this.openModalAddUser.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { ingredients } = props.currentShoppingList;
    const { refIngredients } = props;

    if (state.ingredients !== ingredients) {
      const ingredientsNotValidate = getValidateIngredientsFromId(
        ingredients,
        refIngredients,
        false
      );

      const fruitsAliment = getIngredientsFromKind(ingredientsNotValidate, 'fruit');
      const vegetablesAliment = getIngredientsFromKind(ingredientsNotValidate, 'vegetable');

      const validateAliments = getValidateIngredientsFromId(ingredients, refIngredients, true);

      return {
        fruitsAliment,
        vegetablesAliment,
        validateAliments
      };
    }

    return;
  }

  renderRemainingAliments() {
    const { ingredients } = this.props.currentShoppingList;

    const ingredientsValidate = ingredients.filter(({ isValidate }) => isValidate);
    const ingredientsNotValidate = ingredients.filter(({ isValidate }) => !isValidate);
    const nbrIngredients = ingredients.length;

    if (ingredientsNotValidate.length >= 1) {
      return `${ingredientsNotValidate.length} ingredients restants`;
    } else if (ingredientsValidate.length === nbrIngredients && nbrIngredients > 0) {
      return 'COMPLET';
    } else if (nbrIngredients === 0) {
      return 'Liste vide';
    }

    return `${nbrIngredients} ingredients restant`;
  }

  addAliment() {
    const { navigation, currentShoppingList } = this.props;
    const { _id, name } = currentShoppingList;

    navigation.navigate('SearchIngredient', {
      idShoppingList: _id,
      nameShoppingList: name
    });
  }

  openModalAddUser() {
    const { _id } = this.props.currentShoppingList;

    this.props.navigation.navigate('SearchUser', {
      isEditUser: true,
      idShoppingList: _id
    });
  }

  render() {
    const { validateAliments, fruitsAliment, vegetablesAliment } = this.state;
    const { _id, users } = this.props.currentShoppingList;

    return (
      <View style={styles.parentContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <ScrollView horizontal contentContainerStyle={{ paddingVertical: 10 }}>
            {users.map(({ username, avatar }, i) => (
              <View key={i} style={{ marginRight: 10 }}>
                <Thumbnail source={{ uri: `${serverUrl}/${avatar.uri}` }} />
                <Text style={{ alignSelf: 'center', marginTop: 6 }}>{username}</Text>
              </View>
            ))}
            <Button
              transparent
              onPress={() => this.openModalAddUser()}
              style={{ marginLeft: 10, alignSelf: 'center' }}
            >
              <Icon icon="addUser" size={35} />
            </Button>
          </ScrollView>

          <Header searchBar rounded transparent>
            <Item style={styles.item}>
              <Icon icon="search" size={20} style={styles.iconSearch} />
              <Input placeholder="Rechercher un aliment dans la liste" />
            </Item>
          </Header>

          <View style={styles.containerIngredients}>
            <Text style={styles.remainingAliment}>{this.renderRemainingAliments()}</Text>
            {isArrayFill(fruitsAliment) && (
              <Accordeon title="Fruits">
                <ListIngredient ingredients={fruitsAliment} idShoppingList={_id} />
              </Accordeon>
            )}
            {isArrayFill(vegetablesAliment) && (
              <Accordeon title="Légumes">
                <ListIngredient ingredients={vegetablesAliment} idShoppingList={_id} />
              </Accordeon>
            )}
            {isArrayFill(validateAliments) && (
              <Accordeon
                title={validateAliments.length > 0 ? 'Aliments validés' : 'Aliment validé'}
                isOpen={true}
              >
                <ListIngredient
                  ingredients={validateAliments}
                  isValidate={true}
                  idShoppingList={_id}
                />
              </Accordeon>
            )}
          </View>
        </ScrollView>

        <Button iconLeft rounded onPress={this.addAliment} style={styles.btnAddAliment}>
          <Icon icon="plus--white" size={15} style={{ marginRight: 5 }} />
          <Text style={styles.textAddAliment}>Ajouter un aliment</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state, { navigation }) => ({
  refIngredients: state.recipe.refIngredients,
  currentShoppingList: currentShoppingListSelector(
    state.shoppingList.shoppingLists,
    navigation.state.params.idShoppingList
  )
});

export default connect(mapStateToProps)(ShoppingListScreen);
