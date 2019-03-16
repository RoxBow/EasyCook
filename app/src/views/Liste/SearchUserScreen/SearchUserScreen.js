import styles from './SearchUserScreen.style';
import React from 'react';
import { View } from 'react-native';
import { Header, Left, Body, Right, Container, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { fetchUsers, setUsersSelected, saveNewUsers } from '../../../redux/ShoppingList/actions';
import { connect } from 'react-redux';
import { usersSelector } from '../../../redux/ShoppingList/selectors';
import ListUserItem from '../../../components/ListUserItem/ListUserItem';
import { pink } from '../../../constants/colors';
import { combineSelectors } from '../../../constants/helpers';
import Text from '../../../components/Text/Text';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleHeader from '../../../components/Header/TitleHeader/TitleHeader';

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
      <Container>
        <Header transparent>
          <Left>
            <AntDesign name="close" size={30} color={pink} onPress={() => navigation.goBack()} />
          </Left>
          <Body style={{ flex: 3 }}>
            <TitleHeader title="Ajouter des amis" />
          </Body>
          <Right>
            <Button transparent onPress={() => this.confirmUser()}>
              <Text>Ajouter</Text>
            </Button>
          </Right>
        </Header>
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
                    user={user}
                    checkUser={() => this.toggleUser(user)}
                    isChecked={this.isUserSelected(user._id)}
                  />
                );
              })}
          </View>
        </View>
      </Container>
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
