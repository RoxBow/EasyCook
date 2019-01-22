import styles from './searchingredientscreen.style';
import React from 'react';
import { View, Text, TouchableOpacity, Icon } from 'react-native';
import { connect } from 'react-redux';
import { Item, Header, Input } from 'native-base';
import { EvilIcons, AntDesign } from '@expo/vector-icons';

class SearchIngredientScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goToIngredient = this.goToIngredient.bind(this);
  }

  goToIngredient(ingredient) {
    const { idShoppingList, nameShoppingList } = this.props.navigation.state.params;

    this.props.navigation.navigate('AddIngredient', {
      ...ingredient,
      idShoppingList,
      nameShoppingList
    });
  }

  render() {
    const { refIngredients } = this.props;
    const { searchText } = this.state;

    return (
      <View style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <EvilIcons name="search" size={25} color="#000" style={styles.iconSearch} />
            <Input
              onChangeText={searchText => this.setState({ searchText })}
              placeholder="Rechercher un ingredient"
            />
          </Item>
          <AntDesign
            name="closecircle"
            size={25}
            color="#000"
            onPress={() => this.props.navigation.goBack()}
          />
        </Header>

        <View>
          {refIngredients
            .filter(({ name }) => !searchText || name.includes(searchText))
            .map((ingredient, i) => (
              <TouchableOpacity key={i} onPress={() => this.goToIngredient(ingredient)}>
                <Text>{ingredient.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  refIngredients: state.recipe.refIngredients
});

export default connect(mapStateToProps)(SearchIngredientScreen);
