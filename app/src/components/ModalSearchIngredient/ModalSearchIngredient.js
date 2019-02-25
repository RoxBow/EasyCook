import styles from './ModalSearchIngredient.style';
import React from 'react';
import Modal from '../Modal/Modal';
import { connect } from 'react-redux';
import { refDataSelector } from '../../redux/Recipe/selectors';
import { compose, withStateHandlers } from 'recompose';
import Text from '../Text/Text';
import { View, TouchableOpacity } from 'react-native';
import SearchBar from '../SearchBar/SearchBar';

const ModalSearchIngredient = ({
  isOpen,
  refIngredients,
  updateSearch,
  searchText,
  addIngredient,
}) => (
  <Modal isOpen={isOpen} animationType="slide" transparent={false}>
    <View style={{ marginTop: 22 }}>
      <View style={styles.containerSearchBar}>
        <SearchBar
          onChange={searchText => updateSearch(searchText)}
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
            <TouchableOpacity key={i} onPress={() => addIngredient(ingredient)}>
              <Text>{ingredient.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  </Modal>
);

export default compose(
  connect(refDataSelector),
  withStateHandlers(
    { searchText: '', modalQuantityVisible: false, ingredientSelected: '' },
    {
      updateSearch: () => value => ({
        searchText: value
      }),
    }
  )
)(ModalSearchIngredient);
