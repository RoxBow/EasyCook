import { StyleSheet } from 'react-native';
import { greyApp } from '../../constants/colors';

const styles = StyleSheet.create({
 
  line: {
    borderBottomColor: greyApp,
    borderBottomWidth: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  textValidate: { 
    color: greyApp, 
    textDecorationLine: 'line-through' 
  },

  textIngredient: {
    marginLeft: 10
  }
});

export default styles;
