import { StyleSheet } from 'react-native';
import { orange } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 170,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  wrapperImage: {
    flex: .6,
    overflow: 'hidden',
  },
  wrapperText: {
    padding: 10,
    flex: .5,
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },

  category: {
    fontSize: 16,
    color: orange
  },
  nameRecipe: {
    fontSize: 18,
  },
  username: {
    fontSize: 14,
    color: 'grey',
  }
});

export default styles;
