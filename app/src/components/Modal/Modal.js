import React from 'react';
import { Modal as ModalRN } from 'react-native';

const Modal = ({ animationType, isOpen, children, transparent }) => (
  <ModalRN animationType={animationType || "fade"} transparent={ transparent || false} visible={isOpen}>
    {children}
  </ModalRN>
);

export default Modal;
