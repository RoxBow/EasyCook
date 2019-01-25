import styles from './addshoppinglistscreen.style';
import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Container, DatePicker, Button } from 'native-base';
import { connect } from 'react-redux';
import { addShoppingList } from '../../../redux/ShoppingList/actions';

class AddShoppingListScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: 'Mon anniv',
      chosenDate: new Date()
    };

    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    const { refIngredients } = this.props;

    this.setState({
      ingredients: refIngredients
    });
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    const { addShoppingList } = this.props;
    const { name, chosenDate } = this.state;

    return (
      <Container style={styles.container}>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder="Donner un nom à la liste"
          />
        </View>

        <DatePicker
          minimumDate={new Date()}
          maximumDate={new Date(2019, 12, 31)}
          locale={'fr'}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          placeHolderText="Définir une date de fin"
          textStyle={{ color: '#000' }}
          placeHolderTextStyle={{ color: '#d3d3d3' }}
          onDateChange={this.setDate}
          disabled={false}
        />
        <Text>Date: {chosenDate.toString().substr(4, 12)}</Text>

        <Button
          style={styles.btnValidate}
          rounded
          onPress={() => addShoppingList(name, chosenDate)}
        >
          <Text style={styles.btnValidateText}>Créer</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  refIngredients: state.recipe.refIngredients
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addShoppingList: (name, maxDate) => dispatch(addShoppingList(name, maxDate, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShoppingListScreen);
