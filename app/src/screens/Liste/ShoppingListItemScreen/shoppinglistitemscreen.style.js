import { StyleSheet } from 'react-native';
import { greyApp, pink } from '../../../constants/colors';

const styles = StyleSheet.create({
  parentContainer: {
    position: 'relative',
    flex: 1,
  },

  container: {
    paddingBottom: 50,
    paddingHorizontal: 15,
  },

  item: {
    backgroundColor: greyApp,
    paddingHorizontal: 5
  },

  iconSearch: {
    paddingVertical: 5
  },

  remainingAliment: {
    marginVertical: 10,
    color: 'grey'
  },

  btnAddAliment: {
    position: 'absolute',
    bottom: 15,
    paddingHorizontal: 15,
    alignSelf: 'center',
    backgroundColor: pink,
  },

  textAddAliment: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: '600'
  }
});

export default styles;
