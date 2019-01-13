import styles from './signin.style';
import React from 'react';
import axios from 'axios';
import { AsyncStorage, Button, TextInput, View, Text } from 'react-native';
import { serverUrl } from '../../constants/global';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "test@yopmail.fr",
      username: "vince",
      password: "patate"
    };

    this.signIn =  this.signIn.bind(this);
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  signIn() {
    const { email, username, password } = this.state;

    axios
      .post(`${serverUrl}/api/auth/signIn`, {
        email,
        username,
        password
      })
      .then(({data}) => {
        console.log('RESPONSE SIGNIN', data);
      })
      .catch(err => {
        console.log('ERR',err.response.data);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up</Text>
        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          placeholder="Username"
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

        <Button title="Sign in!" onPress={this.signIn} />
      </View>
    );
  }
}

export default SignIn;
