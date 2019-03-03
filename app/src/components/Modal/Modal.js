import React from 'react';
import { Modal as ModalRN } from 'react-native';
import { withNavigation } from 'react-navigation';
const Modal = ({ animationType, isOpen, children, transparent, navigation }) => (
  <ModalRN
    onRequestClose={() => navigation.goBack()}
    animationType={animationType || 'fade'}
    transparent={transparent || false}
    visible={isOpen}
  >
    {children}
  </ModalRN>
);

export default withNavigation(Modal);
