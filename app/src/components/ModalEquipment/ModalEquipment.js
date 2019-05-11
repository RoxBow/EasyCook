import styles from './ModalEquipment.style';
import React from 'react';
import Modal from '../Modal/Modal';
import { connect } from 'react-redux';
import { refDataSelector } from '../../redux/Recipe/selectors';
import Svg from 'react-native-svg-uri';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';
import TitleHeader from '../Header/TitleHeader/TitleHeader';
import CloseModal from '../CloseModal/CloseModal';
import Button from '../Button/Button';
import { View, TouchableOpacity } from 'react-native';
import { addOrRemoveInArray } from '../../constants/helpers';
import { withNavigation } from 'react-navigation';

const ModalEquipment = ({ isOpen, refEquipments, equipments, addEquipments, navigation }) => (
  <Modal isOpen={isOpen} animationType="slide" transparent={false}>
    <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <CloseModal navigation={navigation} />
      <TitleHeader title="Choix des ustensiles"/>
      <Button text="Valider" onPress={() => addEquipments(equipments)} transparent />
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
      {refEquipments.map(({ name, uri }, i) => (
        <TouchableOpacity onPress={() => addOrRemoveInArray(equipments, name)} key={i} style={{ marginRight: 25 }}>
          <Svg source={{ uri: `${serverUrl}/${uri}` }} width={50} height={50} />
          <Text>{name}</Text>
          {equipments.includes(name) && <Text>Checked</Text>}
        </TouchableOpacity>
      ))}
    </View>
  </Modal>
);

export default withNavigation(connect(refDataSelector)(ModalEquipment));
