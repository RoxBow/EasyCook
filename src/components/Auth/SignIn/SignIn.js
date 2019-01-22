import styles from './signin.style';
import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { requestLogin } from '../../../redux/User/actions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
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
    const { requestLogin } = this.props;

    requestLogin(email, password);
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

const mapDispatchToProps = (dispatch, { navigation }) => ({
  requestLogin: (email, password) => dispatch(requestLogin(email, password, navigation))
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(SignIn)
);
