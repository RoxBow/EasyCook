import styles from './SettingShoppingListItemScreen.style';
import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addShoppingList } from '../../../redux/ShoppingList/actions';

class SettingShoppingListItemScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      
    };
  }

  render() {
    

    return (
      <View></View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingShoppingListItemScreen);
