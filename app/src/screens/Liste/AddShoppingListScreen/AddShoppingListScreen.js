import styles from './addshoppinglistscreen.style';
import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
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
    this.openModalUsers = this.openModalUsers.bind(this);
    this.addShoppingList = this.addShoppingList.bind(this);
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

  openModalUsers() {
    const { usersSelected, navigation } = this.props;

    navigation.navigate('SearchUser', {
      usersSelected
    });
  }

  addShoppingList() {
    const { addShoppingList, usersSelected } = this.props;
    const { name, chosenDate } = this.state;

    // keep only _id users
    const users = usersSelected.map(({ _id }) => _id);

    addShoppingList(name, chosenDate, users);
  }

  render() {
    const { usersSelected } = this.props;
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

        <TouchableOpacity onPress={() => this.openModalUsers()}>
          <Text>Ajouter des amis</Text>
          {usersSelected.map(({ username }, i) => (
            <Text key={i}>{username}</Text>
          ))}
        </TouchableOpacity>
        <Button
          style={styles.btnValidate}
          rounded
          onPress={() => this.addShoppingList(name, chosenDate)}
        >
          <Text style={styles.btnValidateText}>Créer</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  refIngredients: state.recipe.refIngredients,
  usersSelected: state.shoppingList.usersSelected || []
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addShoppingList: (name, maxDate, users) =>
    dispatch(addShoppingList(name, maxDate, users, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShoppingListScreen);
