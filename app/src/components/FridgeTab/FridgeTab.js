import styles from './FridgeTab.syle';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import Text from '../Text/Text';
import { connect } from 'react-redux';
import { combineSelectors } from '../../constants/helpers';
import { refDataSelector } from '../../redux/Recipe/selectors';
import { serverUrl } from '../../constants/global';
import { pink } from '../../constants/colors';
import { withNavigation } from 'react-navigation';

const FridgeTab = ({ refIngredients, navigation }) => (
  <View>
    <View style={{ paddingVertical: 15 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
          marginHorizontal: 15
        }}
      >
        <Text medium>Dans mon frigo</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FridgeIngredient')}>
          <Text style={{ color: pink }} medium>Ajouter aliments</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        {refIngredients.map((ingredient, i) => (
          <Thumbnail key={i} source={{ uri: `${serverUrl}/${ingredient.uri}` }} style={{ marginRight: 8 }} />
        ))}
      </ScrollView>
    </View>
  </View>
);

export default withNavigation(connect(combineSelectors(refDataSelector))(FridgeTab));
