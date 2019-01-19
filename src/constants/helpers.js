import { AsyncStorage } from 'react-native';

export const getToken = () => {
  return AsyncStorage.getItem('userToken');
}
 