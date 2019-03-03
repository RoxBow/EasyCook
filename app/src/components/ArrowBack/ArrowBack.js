import React from 'react';
import Icon from '../Icon/Icon';
import { Button } from 'native-base';

const ArrowBack = ({ navigation }) => (
  <Button
    transparent
    onPress={() => navigation.goBack()}
    style={{ marginLeft: 15, alignSelf: 'center' }}
  >
    <Icon icon="arrow_back" size={30} />
  </Button>
);

export default ArrowBack;
