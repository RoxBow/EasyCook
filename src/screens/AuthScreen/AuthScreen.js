import styles from './authscreen.style';
import React from 'react';
import { View } from 'react-native';
import SignIn from '../../components/Auth/SignIn/SignIn';
import SignUp from '../../components/Auth/SignUp/SignUp';

class AuthScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  static navigationOptions = {
    title: 'Authentication'
  };

  render() {
    return (
      <View style={styles.container}>
        <SignUp />
        <SignIn />
      </View>
    );
  }
}
export default AuthScreen;
