import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    padding: 15
  },
  wrapperBigInput: {
    paddingVertical: 30
  },
  wrapperDisabledInput: {
    backgroundColor: 'grey'
  },

  icon: {
    marginRight: 8
  },

  input: {
    fontSize: 18,
    fontFamily: 'Quicksand'
  },
  bigInput: {
    fontSize: 24
  },
  placeholderImage: {
    fontSize: 18,
    color: 'grey'
  }
});

export default styles;
