import { StyleSheet } from 'react-native';
import { orange } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 2,
    position: 'relative',
  },
  wrapperImage: {
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  wrapperText: {
    padding: 10,
    flex: 1,
  },

  image: {
    flex: 1,
    width: null,
    height: 100,
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
