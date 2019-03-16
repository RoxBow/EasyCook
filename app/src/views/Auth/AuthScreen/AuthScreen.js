import styles from './AuthScreen.style';
import React from 'react';
import { View, ImageBackground } from 'react-native';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import { LinearGradient } from 'expo';

class AuthScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    return (
      <ImageBackground
        source={require('../../../assets/images/backgroundHome.jpg')}
        style={{ flex: 1 }}
      >
        <LinearGradient colors={['transparent', 'rgba(0,0,0,.5)']} style={styles.gradient} />
        <View
          style={styles.wrapperLogo}
        >
          <Text style={{ color: '#fff', fontSize: 80 }} bold>
            Easy Cook
          </Text>
          <Text style={{ color: '#fff', marginTop: 10 }} bold>
            Better than your kitchen book !
          </Text>
        </View>
        <View style={styles.wrapperButtons}>
          <Button
            rounded
            text="Se connecter"
            onPress={() => navigation.navigate('SignIn')}
            style={{ ...styles.firstButton, ...styles.button }}
            styleText={{ ...styles.firstTextButton, ...styles.textButton }}
          />
          <Button
            rounded
            text="S'inscrire"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.button}
          />
        </View>
      </ImageBackground>
    );
  }
}
export default AuthScreen;
