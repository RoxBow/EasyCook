import styles from './FridgeTab.syle';
import React from 'react';
import { View } from 'react-native';
import ThumbnailList from '../ThumbnailList/ThumbnailList';
import { connect } from 'react-redux';
import { combineSelectors } from '../../constants/helpers';
import { refDataSelector } from '../../redux/Recipe/selectors';

const FridgeTab = ({ refIngredients }) => (
  <View>
    <ThumbnailList title="Dans mon frigo" list={refIngredients} />
  </View>
);

export default connect(
  combineSelectors(
    refDataSelector
  )
)(FridgeTab);
