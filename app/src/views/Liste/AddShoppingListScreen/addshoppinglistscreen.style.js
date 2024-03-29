import { StyleSheet } from 'react-native';
import { pink } from '../../../constants/colors';

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
    backgroundColor: pink,
    alignSelf: 'center'
  },

  btnValidateText: {
    color: '#fff',
    fontSize: 15,
  },
  btnCreate: {
    marginTop: 20,
    width: '50%',
    justifyContent: 'center'
  }
});

export default styles;
