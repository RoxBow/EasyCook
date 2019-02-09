import { StyleSheet } from 'react-native';
import { greyApp } from '../../constants/colors';

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
    fontWeight: 'bold',
    borderBottomColor: greyApp,
    borderBottomWidth: 1
  }
});

export default styles;
