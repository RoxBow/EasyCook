import { StyleSheet } from 'react-native';
import { greyApp } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapperIngredients: {
    marginBottom: 25,
  },

  line: {
    borderBottomColor: greyApp,
    borderBottomWidth: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontSize: 22,
    marginBottom: 6,
    fontWeight: 'bold',
    borderBottomColor: greyApp,
    borderBottomWidth: 1,
  },

  textValidate: { 
    color: greyApp, 
    textDecorationLine: 'line-through' 
  }
});

export default styles;
