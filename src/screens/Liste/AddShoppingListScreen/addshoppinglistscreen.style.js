import { StyleSheet } from 'react-native';
import { greenApp } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  wrapperInput: {
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 20,
    paddingVertical: 60,
    paddingHorizontal: 15,
  },

  btnValidate: {
    paddingHorizontal: 50,
    backgroundColor: greenApp,
    alignSelf: 'center'
  },

  btnValidateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default styles;
