import styles from './ModalAddRecipeCalendar.style';
import React from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { DatePicker } from 'native-base';
import { connect } from 'react-redux';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { View } from 'react-native';
import { saveRecipeCalendar } from '../../redux/Calendar/actions';
import { compose, withStateHandlers } from 'recompose';

const ModalAddRecipeCalendar = ({
  idRecipe,
  isOpen,
  onRequestClose,
  setDate,
  date,
  saveRecipeCalendar
}) => (
  <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={onRequestClose}>
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
      }}
      onPressOut={onRequestClose}
    >
      <TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: 300,
            height: 200,
            borderRadius: 10
          }}
        >
          <Text>Sélectionner la date</Text>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            locale={'fr'}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText="Définir une date"
            textStyle={{ color: '#000' }}
            placeHolderTextStyle={{ color: '#d3d3d3' }}
            onDateChange={setDate}
            disabled={false}
          />

          <Button
            rounded
            text="Sauvegarder"
            onPress={() => {
              saveRecipeCalendar(idRecipe, date);
              onRequestClose();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  </Modal>
);

const mapDispatchToProps = dispatch => ({
  saveRecipeCalendar: (idRecipe, date) => dispatch(saveRecipeCalendar(idRecipe, date))
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStateHandlers(
    ({ date = new Date() }) => ({
      date
    }),
    {
      setDate: () => date => ({
        date
      })
    }
  )
)(ModalAddRecipeCalendar);
