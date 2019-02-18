import styles from './SettingShoppingListItemScreen.style';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { currentShoppingListSelector } from '../../../redux/ShoppingList/selectors';
import ListAvatar from '../../../components/ListAvatar/ListAvatar';
import { leaveShoppingList } from '../../../redux/ShoppingList/actions';
import Text from '../../../components/Text/Text';

class SettingShoppingListItemScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { currentShoppingList, leaveShoppingList } = this.props;
    const { users, name, _id } = currentShoppingList;

    return (
      <View>
        <View style={styles.wrapperHead}>
          <ListAvatar
            listUser={users}
            styleThumbnail={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Button onPress={() => leaveShoppingList(_id)}>
          <Text>Quitter la liste</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state, { navigation }) => ({
  currentShoppingList: currentShoppingListSelector(
    state.shoppingList.shoppingLists,
    navigation.state.params.idShoppingList
  )
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  leaveShoppingList: idShoppingList => dispatch(leaveShoppingList(idShoppingList, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingShoppingListItemScreen);
