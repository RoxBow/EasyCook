import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 160,
    width: 160,
    margin: 10,
    borderRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  wrapperText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  category: {
    color: '#fff'
  },

  nameRecipe: {
    color: '#fff',
    fontSize: 18
  }

});

export default styles;
