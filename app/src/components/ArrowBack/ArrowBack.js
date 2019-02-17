import React from 'react';
import Icon from '../Icon/Icon';
import { Button } from 'native-base';

const ArrowBack = ({ navigation }) =>
  <Button transparent onPress={() => navigation.goBack()}>
    <Icon icon="arrowBack" size={20} />
  </Button>

export default ArrowBack;