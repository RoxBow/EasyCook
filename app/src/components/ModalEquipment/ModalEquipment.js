import styles from './ModalEquipment.style';
import React from 'react';
import Modal from '../Modal/Modal';
import { connect } from 'react-redux';
import { refDataSelector } from '../../redux/Recipe/selectors';
import Svg from 'react-native-svg-uri';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';
import { Button } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { addOrRemoveInArray } from '../../constants/helpers';

const ModalEquipment = ({ isOpen, refEquipments, equipments, addEquipments }) => (
  <Modal isOpen={isOpen} animationType="slide" transparent={false}>
    <View style={{ marginTop: 22 }}>
      <Button onPress={() => addEquipments(equipments)}>
        <Text>Ajouter les ustensiles</Text>
      </Button>
      {refEquipments.map(({ name, uri }, i) => (
        <TouchableOpacity onPress={() => addOrRemoveInArray(equipments, name)} key={i}>
          <Svg source={{ uri: `${serverUrl}/${uri}` }} width={50} height={50} />
          <Text>{name}</Text>
          {equipments.includes(name) && <Text>Checked</Text>}
        </TouchableOpacity>
      ))}
    </View>
  </Modal>
);

export default connect(refDataSelector)(ModalEquipment);
