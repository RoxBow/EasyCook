import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import styles from './accountscreen.style';

class AccountScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Text>Account</Text>
      </Container>
    );
  }
}

export default AccountScreen;
