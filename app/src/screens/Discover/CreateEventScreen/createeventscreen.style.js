import { StyleSheet } from 'react-native';
import { pink } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperInput: {
    marginBottom: 10,
    borderBottomWidth: 0,
  },

  mainInput: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 20,
    height: 120,
    paddingHorizontal: 15,
  },

  btnValidate: {
    paddingHorizontal: 50,
    backgroundColor: pink,
    alignSelf: 'center'
  },

  btnValidateText: {
    color: '#fff',
    fontSize: 15,
  }
});

export default styles;
