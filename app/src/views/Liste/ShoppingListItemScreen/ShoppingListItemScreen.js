import styles from './ShoppingListItemScreen.style';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import ListIngredient from '../../../components/ListIngredient/ListIngredient';
import {
  getValidateIngredientsFromId,
  getIngredientsFromKind,
  isArrayFill,
  combineSelectors
} from '../../../constants/helpers';
import Accordeon from '../../../components/Accordeon/Accordeon';
import { currentShoppingListSelector } from '../../../redux/ShoppingList/selectors';
import { refDataSelector } from '../../../redux/Recipe/selectors';
import { serverUrl } from '../../../constants/global';
import Icon from '../../../components/Icon/Icon';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';
import SearchBar from '../../../components/SearchBar/SearchBar';

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
            <ButtonIcon
              style={{ marginLeft: 10, alignSelf: 'center' }}
              onPress={() => this.openModalAddUser()}
              icon="add_user"
              size={35}
            />
          </ScrollView>

          <SearchBar styleWrapper={styles.item} placeholder="Rechercher un aliment dans la liste" />
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

        <Button
          rounded
          onPress={this.addAliment}
          style={styles.btnAddAliment}
          styleText={styles.textAddAliment}
          text="Ajouter un aliment"
        >
          <Icon icon="plus--white" size={15} style={{ marginRight: 5 }} />
        </Button>
      </View>
    );
  }
}

const mapStateToProps = combineSelectors(refDataSelector, (s, { navigation }) =>
  currentShoppingListSelector(navigation.state.params.idShoppingList)(s)
);

export default connect(mapStateToProps)(ShoppingListScreen);
