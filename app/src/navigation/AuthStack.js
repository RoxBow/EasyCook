import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ArrowBack from '../components/ArrowBack/ArrowBack'

import AuthScreen from '../screens/Auth/AuthScreen/AuthScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen/SignUpScreen';
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';

const AuthStack = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <ArrowBack navigation={navigation} />,
      headerStyle: { borderBottomWidth: 0 },
    })
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <ArrowBack navigation={navigation} />,
      headerStyle: { borderBottomWidth: 0 },
    })
  },
});


export default AuthStack;
