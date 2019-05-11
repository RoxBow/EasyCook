import styles from './SignUpScreen.style';
import React from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { requestSignUp } from '../../../redux/User/actions';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';

class SignUpScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      email: 'test@yopmail.fr',
      username: 'vince',
      password: 'patate'
    };

    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const { email, username, password } = this.state;
    const { requestSignUp } = this.props;

    requestSignUp(email, username, password);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ position: 'absolute', top: '15%', alignSelf: 'center' }}>
        <Icon icon="second_logo" width={200} height={50}/>
          <Text medium>Créer un compte</Text>
        </View>
        <View style={{ paddingHorizontal: 40, marginBottom: 10, width: '100%' }}>
          <TextInput
            style={styles.input}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            placeholder="Pseudonyme"
            autoCapitalize="none"
          />
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
          <View>
            <Text>
              En cochant cette case, vous acceptez les conditions générales d'utilisations et la
              politique de confidentialité de l'application EasyCook
            </Text>
          </View>
        </View>
        <Button rounded text="Créer un compte" style={styles.button} onPress={this.signUp} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestSignUp: (email, username, password) => dispatch(requestSignUp(email, username, password))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);
