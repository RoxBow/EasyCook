import styles from './addingredientscreen.style';
import React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addIngredientToShoppingListItem } from '../../../redux/ShoppingList/actions';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import Select from '../../../components/Select/Select';
import { UNITS } from '../../../constants/global';

class AddIngredientScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: '1',
      unity: 'gram'
    };

    this.addIngredientToSoppingList = this.addIngredientToSoppingList.bind(this);
  }

  redirectToShoppingListItem() {
    this.props.navigation.pop(2);
  }

  addIngredientToSoppingList() {
    const { id: idIngredient, idShoppingList } = this.props.navigation.state.params;
    const { addIngredientToShoppingListItem } = this.props;
    const { quantity, unity } = this.state;

    addIngredientToShoppingListItem(idIngredient, quantity, unity, idShoppingList);
  }

  render() {
    const { nameShoppingList } = this.props.navigation.state.params;
    const { quantity, unity } = this.state;

    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 10 }}>Saisir une quantité</Text>
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <TextInput
            keyboardType="numeric"
            onChangeText={quantity => this.setState({ quantity })}
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
          <Select
            values={UNITS}
            selected={unity}
            updateValue={value => this.setState({ unity: value })}
          />
        </View>
        <Button
          rounded
          onPress={this.addIngredientToSoppingList}
          text={`Ajouter à la liste ${nameShoppingList}`}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addIngredientToShoppingListItem: (idIngredient, quantity, unity, idShoppingList) =>
    dispatch(
      addIngredientToShoppingListItem(idIngredient, quantity, unity, idShoppingList, navigation)
    )
});

export default connect(
  null,
  mapDispatchToProps
)(AddIngredientScreen);
