import styles from './accountscreen.style';
import React from 'react';
import { Text, Button } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { requestLogout } from '../../redux/User/actions';

class AccountScreen extends React.Component {
  constructor(){
    super();

    this.state = {}
  }

  render() {
    const { username, requestLogout } = this.props;

    return (
      <Container style={styles.container}>
        <Text>Account de {username}</Text>
        <Button title="Logout" onPress={requestLogout} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.info.username
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  requestLogout: () => dispatch(requestLogout(navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
