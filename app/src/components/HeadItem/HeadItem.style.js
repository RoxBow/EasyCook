import { StyleSheet } from 'react-native';
import { orange } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  category: {
    textTransform: 'uppercase',
    color: orange,
  },

  title: {
    fontSize: 20,
    marginVertical: 5,
    maxWidth: 200,
    textAlign: 'center'
  },
});

export default styles;
