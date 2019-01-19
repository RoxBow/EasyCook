import styles from './addshoppinglistscreen.style';
import React from 'react';
import axios from 'axios';
import { Button, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { Container, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { serverUrl } from '../../constants/global';
import { addShoppingList } from '../../redux/User/actions';

class AddShoppingListScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "Mon anniv"
    };

    this.toggleIngredient = this.toggleIngredient.bind(this);
    this.getIngredientSelected = this.getIngredientSelected.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${serverUrl}/ingredients`)
      .then(({ data }) => {
        this.setState({
          ingredients: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleIngredient(name) {
    const { ingredients } = this.state;

    const ingredientsUpdate = ingredients.map(ingredient => {
      if (ingredient.name === name) return { ...ingredient, isSelected: !ingredient.isSelected };

      return ingredient;
    });

    this.setState({
      ingredients: ingredientsUpdate
    });
  }

  getIngredientSelected() {
    const { ingredients } = this.state;
    const ingredienntSelected = [];

    ingredients.map(({ isSelected, id }) => {
      if (isSelected) ingredienntSelected.push(id);
    });

    return ingredienntSelected;
  }

  render() {
    const { addShoppingList } = this.props;
    const { name, ingredients } = this.state;

    return (
      <Container style={styles.container}>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder="Anniv' Cécile"
          />
        </View>
        <ScrollView contentContainerStyle={styles.wrapperIngredient}>
          {ingredients &&
            ingredients.map(({ name, uri, isSelected }, i) => (
              <TouchableOpacity
                key={i}
                style={[isSelected && styles.isSelected, styles.ingredient]}
                onPress={() => this.toggleIngredient(name)}
              >
                <Thumbnail square large source={{ uri: `${serverUrl}/assets/${uri}` }} />
              </TouchableOpacity>
            ))}
        </ScrollView>

        <Button
          title="Sauvegarder"
          onPress={() => addShoppingList(name, this.getIngredientSelected())}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addShoppingList: (name, aliments) => dispatch(addShoppingList(name, aliments, navigation))
});

export default connect(
  null,
  mapDispatchToProps
)(AddShoppingListScreen);
