import { StyleSheet } from 'react-native';
import { darkPink, green, grey } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    maxHeight: 200,
    padding: 10,
    width: '48%',
    marginBottom: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 2
  },

  wrapperTextIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8
  },

  name: {
    fontSize: 18,
    marginBottom: 5,
    marginRight: 10
  },

  outdated: {
    color: darkPink
  },

  validDate: {
    color: green
  },

  shareWith: { 
    fontSize: 12, 
    marginBottom: 5,
    color: grey
  }
});

export default styles;
