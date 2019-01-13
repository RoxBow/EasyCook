import styles from './signup.style';
import React from 'react';
import axios from 'axios';
import { AsyncStorage, Button, TextInput, View, Text } from 'react-native';
import { serverUrl, STATUS } from '../../constants/global';
import { withNavigation } from 'react-navigation';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: 'test@yopmail.fr',
      password: 'patate'
    };

    this.login = this.login.bind(this);
  }

  login() {
    const { email, password } = this.state;
    const { navigation } = this.props;

    axios
      .post(`${serverUrl}/api/auth/login`, {
        username: email,
        password
      })
      .then(({ data }) => {
        AsyncStorage.setItem('userToken', data.token);

        // redirect to app
        navigation.navigate(data.status === STATUS.SUCCESS ? 'App' : 'Auth');
      })
      .catch(err => {
        console.log('ERR login', err.response.data);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          autoCapitalize="none"
        />

        <Button title="Login!" onPress={this.login} />
      </View>
    );
  }
}

export default withNavigation(SignUp);
