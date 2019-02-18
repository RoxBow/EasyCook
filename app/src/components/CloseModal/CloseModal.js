import React from 'react';
import { Button } from 'native-base';
import Icon from '../../components/Icon/Icon';

const CloseModal = ({ navigation }) => (
  <Button transparent onPress={() => navigation.goBack()}>
    <Icon icon="cross" size={30} />
  </Button>
);

export default CloseModal;
