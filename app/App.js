import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import rootReducer from './src/redux/index';
import { fetchRefData } from './src/redux/Recipe/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  _loadResourcesAsync = async () => {
    // await AsyncStorage.clear();
    store.dispatch(fetchRefData());

    await Promise.all([
      Asset.loadAsync([
        /* Load assets img here */
      ]),
      Font.loadAsync({
        /* Load assets fonts/icons here */
        'Quicksand': require('./src/assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        'Quicksand--bold': require('./src/assets/fonts/Quicksand/Quicksand-Bold.ttf'),
        'Quicksand--medium': require('./src/assets/fonts/Quicksand/Quicksand-Medium.ttf'),
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;

    return !isLoadingComplete ? (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />
    ) : (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
