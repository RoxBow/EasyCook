import styles from './signup.style';
import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { requestSignUp } from '../../../redux/User/actions';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "test@yopmail.fr",
      username: "vince",
      password: "patate"
    };

    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const { email, username, password } = this.state;
    const { requestSignUp } = this.props;

    requestSignUp(email, username, password);
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

        <Button title="Sign up!" onPress={this.signUp} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestSignUp: (email, username, password) => dispatch(requestSignUp(email, username, password))
});

export default connect(null, mapDispatchToProps)(SignUp);
