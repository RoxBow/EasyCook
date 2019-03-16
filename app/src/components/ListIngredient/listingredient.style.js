import { StyleSheet } from 'react-native';
import { lightgrey, grey } from '../../constants/colors';

const styles = StyleSheet.create({
 
  line: {
    borderBottomColor: lightgrey,
    borderBottomWidth: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  wrapperName: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textValidate: { 
    color: grey, 
    textDecorationLine: 'line-through' 
  },

  textIngredient: {
    marginLeft: 10
  }
});

export default styles;
