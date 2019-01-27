import styles from './shoppinglistitemscreen.style';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Item, Input, Button } from 'native-base';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import ListIngredient from '../../../components/ListIngredient/ListIngredient';
import {
  getValidateIngredientsFromId,
  getIngredientsFromKind,
  getIngredientsFromId,
  isArrayFill
} from '../../../constants/helpers';

class ShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addAliment = this.addAliment.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { ingredients } = props.navigation.state.params;
    const { refIngredients } = props;

    if (state.ingredients !== ingredients) {
      const ingredientsNotValidate = getValidateIngredientsFromId(ingredients, refIngredients, false);
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
    const { ingredients } = this.props.navigation.state.params;

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

  addAliment() {
    const { navigation } = this.props;
    const { _id, name } = this.props.navigation.state.params;

    navigation.navigate('SearchIngredient', {
      idShoppingList: _id,
      nameShoppingList: name
    });
  }

  render() {
    const { validateAliments, fruitsAliment, vegetablesAliment, remainingAliment } = this.state;
    const { _id } = this.props.navigation.state.params;

    return (
      <View style={styles.parentContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <Header searchBar rounded transparent>
            <Item style={styles.item}>
              <EvilIcons name="search" size={25} color="#000" style={styles.iconSearch} />
              <Input placeholder="Rechercher un aliment dans la liste" />
            </Item>
          </Header>

          <View style={styles.containerIngredients}>
            {remainingAliment && (
              <Text style={styles.remainingAliment}>{this.renderRemainingAliments()}</Text>
            )}
            {isArrayFill(fruitsAliment) && (
              <ListIngredient title="Fruits" ingredients={fruitsAliment} idShoppingList={_id} />
            )}
            {isArrayFill(vegetablesAliment) && (
              <ListIngredient
                title="Légumes"
                ingredients={vegetablesAliment}
                idShoppingList={_id}
              />
            )}
            {isArrayFill(validateAliments) && (
              <ListIngredient
                title={validateAliments.length > 0 ? 'Aliments validés' : 'Aliment validé'}
                ingredients={validateAliments}
                isValidate={true}
                idShoppingList={_id}
              />
            )}
          </View>
        </ScrollView>

        <Button iconLeft rounded onPress={this.addAliment} style={styles.btnAddAliment}>
          <Feather name="plus-circle" size={30} color="#fff" />
          <Text style={styles.textAddAliment}>Ajouter un aliment</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  refIngredients: state.recipe.refIngredients
});

export default connect(mapStateToProps)(ShoppingListScreen);
