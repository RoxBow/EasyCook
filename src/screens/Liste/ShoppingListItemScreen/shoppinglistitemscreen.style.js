import { StyleSheet } from 'react-native';
import { greyApp, greenApp } from '../../../constants/colors';

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
    paddingRight: 15,
    paddingLeft: 10,
    alignSelf: 'center',
    backgroundColor: greenApp,
  },

  textAddAliment: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: '600'
  }
});

export default styles;
