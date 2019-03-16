import styles from './searchingredientscreen.style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import { refDataSelector } from '../../../redux/Recipe/selectors';

class SearchIngredientScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.redirectToIngredient = this.redirectToIngredient.bind(this);
  }

  redirectToIngredient(ingredient) {
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
        <View style={{ padding: 10 }}>
          {refIngredients
            .filter(({ name }) => !searchText || name.includes(searchText))
            .map((ingredient, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.redirectToIngredient(ingredient)}
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderColor: 'lightgrey',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Text>{ingredient.name}</Text>
                <Icon icon="plus_rounded" size={24} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
}

export default connect(refDataSelector)(SearchIngredientScreen);
