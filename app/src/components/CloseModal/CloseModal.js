import React from 'react';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const CloseModal = ({ navigation }) => (
  <ButtonIcon onPress={() => navigation.goBack()} icon="cross" size={30} />
);

export default CloseModal;
