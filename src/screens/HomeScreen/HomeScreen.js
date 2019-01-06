import React from 'react';
import { View, Text } from 'react-native';
import styles from './homescreen.style';
import Test from '../../components/Test/Test';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Bonsoir</Text>
        <Test />
      </View>
    );
  }
}

export default HomeScreen;
