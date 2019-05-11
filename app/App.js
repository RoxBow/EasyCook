import Reactotron from 'reactotron-react-native';
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage, StatusBar, StyleSheet, View, Image } from 'react-native';
import { AppLoading, Font } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import { LIST_SVG } from './src/components/Icon/Icon';
import rootReducer from './src/redux/index';
import { cacheImages } from './src/constants/helpers';
import { fetchRefData } from './src/redux/Recipe/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

Reactotron.configure()
  .useReactNative()
  .connect();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  _loadResourcesAsync = async () => {
    // await AsyncStorage.clear();
    store.dispatch(fetchRefData());

    // const imageAssets = cacheImages([
    //   ...LIST_SVG
    // ]);

    await Promise.all([
      // ...imageAssets,
      Font.loadAsync({
        /* Load assets fonts/icons here */
        Quicksand: require('./src/assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        'Quicksand--bold': require('./src/assets/fonts/Quicksand/Quicksand-Bold.ttf'),
        'Quicksand--medium': require('./src/assets/fonts/Quicksand/Quicksand-Medium.ttf')
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
          <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#f0f" />
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
