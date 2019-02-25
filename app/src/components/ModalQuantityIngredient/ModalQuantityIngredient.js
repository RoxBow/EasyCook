import React from 'react';
import Modal from '../Modal/Modal';
import { compose, withStateHandlers } from 'recompose';

const ModalQuantityIngredient = ({
  isOpen,
  nameIngredient,
  updateQuantity,
  quantity,
  updateUnity,
  unity
}) => (
  <Modal isOpen={isOpen} animationType="slide">
    <View style={{ marginTop: 22 }}>
      <Text>{nameIngredient}</Text>
      <Text style={{ marginBottom: 10 }}>Saisir une quantité</Text>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <TextInput
          keyboardType="numeric"
          onChangeText={quantity => updateQuantity(quantity)}
          value={quantity}
          style={{
            borderRadius: 15,
            backgroundColor: '#fff',
            color: '#000',
            paddingVertical: 20,
            width: '20%',
            textAlign: 'center',
            fontSize: 22,
            marginRight: 10
          }}
        />
        <Picker
          mode="dropdown"
          iosHeader="Unité"
          headerBackButtonText="Fermer"
          style={styles.picker}
          textStyle={styles.pickerText}
          selectedValue={unity}
          onValueChange={itemValue => updateUnity(itemValue)}
        >
          <Picker.Item label={quantity > 1 ? 'grammes' : 'gramme'} value="gram" />
          <Picker.Item label={quantity > 1 ? 'pieces' : 'piece'} value="piece" />
        </Picker>
      </View>
      <Button
        rounded
        onPress={this.addIngredientToSoppingList}
        text={`Ajouter à la liste ${nameShoppingList}`}
      />
    </View>
  </Modal>
);

export default compose(
  withStateHandlers(
    { quantity: '', unity: '' },
    {
      updateQuantity: () => value => ({
        quantity: value
      }),
      updateUnity: () => value => ({
        quantity: value
      })
    }
  )
)(ModalQuantityIngredient);
