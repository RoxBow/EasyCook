import styles from './ModalSearchIngredient.style';
import React from 'react';
import Modal from '../Modal/Modal';
import { connect } from 'react-redux';
import { refDataSelector } from '../../redux/Recipe/selectors';
import { compose, withStateHandlers } from 'recompose';
import Text from '../Text/Text';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import SearchBar from '../SearchBar/SearchBar';
import CloseModal from '../CloseModal/CloseModal';
import TitleHeader from '../Header/TitleHeader/TitleHeader';
import { withNavigation } from 'react-navigation';
import { serverUrl } from '../../constants/global';
import { veryLightgrey } from '../../constants/colors';

const ModalSearchIngredient = ({
  isOpen,
  refIngredients,
  updateSearch,
  searchText,
  addIngredient,
  navigation
}) => (
  <Modal isOpen={isOpen} animationType="slide" transparent={false}>
    <View
      style={{
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CloseModal navigation={navigation} />
      <TitleHeader title="Choix des ingrédients" />
    </View>
    <View>
    <View style={{ backgroundColor: veryLightgrey }}>
      <View style={styles.containerSearchBar}>
        <SearchBar
          onChange={searchText => updateSearch(searchText)}
          placeholder="Rechercher un ingredient"
          styleWrapper={styles.wrapperSearchBar}
          styleInput={{ color: '#fff' }}
          placeholderTextColor="#fff"
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginTop: 15
        }}
      >
        {refIngredients
          .filter(({ name }) => !searchText || name.includes(searchText))
          .map((ingredient, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => addIngredient(ingredient)}
              style={{ backgroundColor: '#fff', alignItems: 'center', padding: 8, borderRadius: 8, marginBottom: 10 }}
            >
              <Image
                source={{ uri: `${serverUrl}/${ingredient.uri}` }}
                style={{ width: 80, height: 80 }}
              />
              <Text>{ingredient.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
    </View>
  </Modal>
);

export default compose(
  withNavigation,
  connect(refDataSelector),
  withStateHandlers(
    { searchText: '', modalQuantityVisible: false, ingredientSelected: '' },
    {
      updateSearch: () => value => ({
        searchText: value
      })
    }
  )
)(ModalSearchIngredient);
