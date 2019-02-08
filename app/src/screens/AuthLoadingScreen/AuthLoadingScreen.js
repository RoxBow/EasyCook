import styles from './authloadingscreen.style';
import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { requestValidityToken } from '../../redux/User/actions';
import { withNavigation } from 'react-navigation';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { requestValidityToken, navigation } = this.props;
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      requestValidityToken(userToken);
    } else {
      navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  requestValidityToken: token => dispatch(requestValidityToken(token, navigation))
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(AuthLoadingScreen)
);
