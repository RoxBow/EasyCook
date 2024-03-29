import styles from './addshoppinglistscreen.style';
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { addShoppingList } from '../../../redux/ShoppingList/actions';
import { usersSelectedSelector } from '../../../redux/ShoppingList/selectors';
import { refDataSelector } from '../../../redux/Recipe/selectors';
import Text from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import Icon from '../../../components/Icon/Icon';
import Button from '../../../components/Button/Button';
import DatePicker from 'react-native-datepicker';
import 'moment/locale/fr';
import { pink } from '../../../constants/colors';
import { serverUrl } from '../../../constants/global';
import { combineSelectors } from '../../../constants/helpers';

class AddShoppingListScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      date: new Date()
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
    this.setState({ date: newDate });
  }

  openModalUsers() {
    const { usersSelected, navigation } = this.props;

    navigation.navigate('SearchUser', {
      usersSelected
    });
  }

  addShoppingList() {
    const { addShoppingList, usersSelected } = this.props;
    const { name, date } = this.state;
    let users = [];

    // keep only _id users
    if(usersSelected){
      users = usersSelected.map(({ _id }) => _id);
    }

    addShoppingList(name, date, users);
  }

  render() {
    const { usersSelected } = this.props;
    const { name, dateDisplay } = this.state;

    return (
      <View>
        <Input
          big
          onChange={name => this.setState({ name })}
          value={name}
          placeholder="Nom de la liste"
        />

        <TouchableOpacity
          onPress={() => this.datePicker.onPressDate()}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'lightgrey',
            borderBottomWidth: 1
          }}
        >
          <Icon icon="date" size={20} style={{ marginRight: 15 }} />
          <DatePicker
            locale="fr"
            showIcon={false}
            date={dateDisplay}
            mode="datetime"
            format="ddd D MMMM YYYY"
            minDate={new Date()}
            confirmBtnText="Valider"
            cancelBtnText="Annuler"
            ref={picker => {
              this.datePicker = picker;
            }}
            customStyles={{
              dateTouch: {
                flex: 1
              },
              dateInput: {
                borderWidth: 0
              },
              btnTextConfirm: {
                color: pink
              },
              dateText: {
                fontSize: 18
              }
            }}
            onDateChange={(dateDisplay, date) => {
              this.setState({ dateDisplay, date });
            }}
          />
        </TouchableOpacity>

        <View style={{ paddingVertical: 15, paddingHorizontal: 30 }}>
          <TouchableOpacity
            onPress={() => this.openModalUsers()}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            <Icon icon="add_user" size={22} style={{ marginRight: 15 }} />
            <Text style={{ fontSize: 18 }}>Ajouter des amis</Text>
          </TouchableOpacity>
          <ScrollView horizontal>
            {usersSelected &&
              usersSelected.map(({ username, avatar }, i) => (
                <View key={i} style={{ marginRight: 10, alignItems: 'center' }}>
                  <Thumbnail source={{ uri: `${serverUrl}/${avatar.uri}` }} />
                  <Text style={{ alignSelf: 'center', marginTop: 6 }}>{username}</Text>
                </View>
              ))}
          </ScrollView>
        </View>

        <Button
          rounded
          text="Créer"
          onPress={() => this.addShoppingList()}
          style={styles.btnCreate}
        />
      </View>
    );
  }
}

const mapStateToProps = combineSelectors(refDataSelector, usersSelectedSelector);

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addShoppingList: (name, maxDate, users) =>
    dispatch(addShoppingList(name, maxDate, users, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShoppingListScreen);
