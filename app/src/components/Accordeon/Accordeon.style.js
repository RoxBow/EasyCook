import { StyleSheet } from 'react-native';
import { lightgrey } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapperIngredients: {
    marginBottom: 25
  },

  wrapperTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  title: {
    fontSize: 22,
    marginBottom: 6,
    borderBottomColor: lightgrey,
    borderBottomWidth: 1
  }
});

export default styles;
