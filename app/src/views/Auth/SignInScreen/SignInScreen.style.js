import { StyleSheet } from 'react-native';
import { mainFont } from '../../../constants/global';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    paddingBottom: 5,
    marginVertical: 10,
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    fontFamily: mainFont,
  },
  button: {
    width: '65%',
    justifyContent: 'center'
  }
});

export default styles;
