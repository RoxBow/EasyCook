import { StyleSheet } from 'react-native';
import { orange, pink } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 2,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 6,
  },
  wrapperText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20
  },
  textCategory: {
    textTransform: 'uppercase',
    color: orange
  },

  wrapperChange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  textChange: {
    color: pink,
    fontSize: 15
  },
  iconChange: {
    marginRight: 10
  }
});

export default styles;
