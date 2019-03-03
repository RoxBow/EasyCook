import { StyleSheet } from 'react-native';
import { pink, darkPink } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '30%'
  },
  wrapperSelected: {
    borderWidth: 1,
    borderColor: darkPink,
    backgroundColor: pink
  },
  name: {
    marginTop: 10,
    fontSize: 15
  },
  nameSelected: {
    color: '#fff'
  }
});

export default styles;
