import { StyleSheet } from 'react-native';
import { pink } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperGeolocation: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: pink,
    paddingBottom: 2,
    paddingRight: 16,
    alignItems: 'center'
  },
  textGeolocation: {
    fontSize: 28,
    fontFamily: 'Quicksand--bold',
    marginRight: 10
  }
});

export default styles;
