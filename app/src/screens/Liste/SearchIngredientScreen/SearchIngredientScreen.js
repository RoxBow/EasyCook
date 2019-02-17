import styles from './searchingredientscreen.style';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from '../../../components/SearchBar/SearchBar';

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
        <View style={styles.containerSearchBar}>
          <SearchBar
            onChange={searchText => this.setState({ searchText })}
            placeholder="Rechercher un ingredient"
            styleWrapper={styles.wrapperSearchBar}
            styleInput={{ color: '#fff' }}
            placeholderTextColor="#fff"
          />
        </View>
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
