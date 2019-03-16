import styles from './SignInScreen.style';
import React from 'react';
import { TextInput, View } from 'react-native';
import { requestLogin } from '../../../redux/User/actions';
import { connect } from 'react-redux';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';

class SignInScreen extends React.Component {
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
        <View style={{ position: 'absolute', top: '15%', alignSelf: 'center' }}>
          <Text>Easy Cook</Text>
          <Text medium>Se connecter à son compte</Text>
        </View>
        <View style={{ paddingHorizontal: 40, marginBottom: 10, width: '100%' }}>
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
            placeholder="Mot de passe"
            autoCapitalize="none"
          />
        <Button rounded text="Se connecter" style={styles.button} onPress={this.login} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  requestLogin: (email, password) => dispatch(requestLogin(email, password, navigation))
});

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);
