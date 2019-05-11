import styles from './SearchUserScreen.style';
import React from 'react';
import { View } from 'react-native';
import { fetchUsers, setUsersSelected, saveNewUsers } from '../../../redux/ShoppingList/actions';
import { connect } from 'react-redux';
import { usersSelector } from '../../../redux/ShoppingList/selectors';
import ListUserItem from '../../../components/ListUserItem/ListUserItem';
import { combineSelectors } from '../../../constants/helpers';
import Text from '../../../components/Text/Text';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleHeader from '../../../components/Header/TitleHeader/TitleHeader';
import Button from '../../../components/Button/Button';
import CloseModal from '../../../components/CloseModal/CloseModal';

class SearchUserScreen extends React.Component {
  constructor(props) {
    super(props);

    const { usersSelected } = props.navigation.state.params;

    this.state = {
      searchText: '',
      usersSelected: usersSelected || []
    };

    this.toggleUser = this.toggleUser.bind(this);
    this.isUserSelected = this.isUserSelected.bind(this);
    this.confirmUser = this.confirmUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  toggleUser(user) {
    const { _id, username, avatar } = user;
    const { usersSelected } = this.state;

    const index = usersSelected.findIndex(({ _id: idUser }) => idUser === _id);

    if (index === -1) {
      usersSelected.push({ _id, username, avatar });
    } else {
      usersSelected.splice(index, 1);
    }

    this.setState({
      usersSelected
    });
  }

  isUserSelected(idUser) {
    const { usersSelected } = this.state;

    return usersSelected.some(({ _id }) => _id === idUser);
  }

  confirmUser() {
    const { navigation, setUsersSelected, saveNewUsers } = this.props;
    const { usersSelected } = this.state;
    const { isEditUser, idShoppingList } = navigation.state.params;

    if (isEditUser) {
      saveNewUsers(usersSelected, idShoppingList, navigation);
      return;
    }

    setUsersSelected(usersSelected);
    navigation.goBack();
  }

  render() {
    const { users, navigation } = this.props;
    const { searchText } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 25 }}>
          <CloseModal navigation={navigation} />
          <TitleHeader title="Ajouter des amis" />
          <Button text="Valider" transparent onPress={() => this.confirmUser()} />
        </View>
        <View style={styles.container}>
          <SearchBar
            onChange={searchText => this.setState({ searchText })}
            placeholder="Rechercher"
          />

          <View style={styles.wrapperUsers}>
            {users
              .filter(
                ({ username }) =>
                  !searchText || username.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((user, i) => {
                if (i === 0 || users[i - 1].username[0] !== user.username[0]) {
                  return (
                    <View key={i}>
                      <View
                        style={{
                          backgroundColor: 'lightgrey',
                          paddingLeft: 10,
                          paddingVertical: 5
                        }}
                      >
                        <Text style={{ fontSize: 16 }} bold>
                          {user.username[0].toUpperCase()}
                        </Text>
                      </View>
                      <ListUserItem
                        user={user}
                        checkUser={() => this.toggleUser(user)}
                        isChecked={this.isUserSelected(user._id)}
                      />
                    </View>
                  );
                }

                return (
                  <ListUserItem
                    key={i}
                    user={user}
                    checkUser={() => this.toggleUser(user)}
                    isChecked={this.isUserSelected(user._id)}
                  />
                );
              })}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = combineSelectors(usersSelector);

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  setUsersSelected: usersSelected => dispatch(setUsersSelected(usersSelected)),
  saveNewUsers: (usersSelected, idShoppingList, navigation) =>
    dispatch(saveNewUsers(usersSelected, idShoppingList, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserScreen);
