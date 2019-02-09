import styles from './SearchUserScreen.style';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Item, Header, Input, Left, Body, Right, Container, Button, Title } from 'native-base';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { fetchUsers, setUsersSelected } from '../../../redux/ShoppingList/actions';
import { connect } from 'react-redux';
import { usersSelector } from '../../../redux/ShoppingList/selectors';
import CheckBox from '../../../components/Checkbox/Checkbox';
import { pink } from '../../../constants/colors';

class SearchUserScreen extends React.Component {
  constructor(props) {
    super(props);

    const { usersSelected } = props.navigation.state.params;

    this.state = {
      searchText: '',
      usersSelected
    };

    this.toggleUser = this.toggleUser.bind(this);
    this.isUserSelected = this.isUserSelected.bind(this);
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

  render() {
    const { users, navigation, setUsersSelected } = this.props;
    const { searchText, usersSelected } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <AntDesign name="close" size={30} color={pink} onPress={() => navigation.goBack()} />
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Ajouter des amis</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                setUsersSelected(usersSelected);
                navigation.goBack();
              }}
            >
              <Text>Terminer</Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.container}>
          <Header searchBar rounded>
            <Item>
              <EvilIcons name="search" size={25} color="#000" style={styles.iconSearch} />
              <Input
                onChangeText={searchText => this.setState({ searchText })}
                placeholder="Rechercher"
                autoCapitalize="none"
              />
            </Item>
          </Header>

          <View style={styles.wrapperUsers}>
            {users
              .filter(({ username }) => !searchText || username.includes(searchText))
              .map((user, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.toggleUser(user)}
                  style={styles.lineUser}
                >
                  <Text>{user.username}</Text>
                  <CheckBox isChecked={this.isUserSelected(user._id)} />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: usersSelector(state.shoppingList.users) || []
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  setUsersSelected: usersSelected => dispatch(setUsersSelected(usersSelected))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserScreen);
