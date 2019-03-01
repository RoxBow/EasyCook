import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapperComment: {
    padding: 20,
    backgroundColor: 'lightgrey',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },

  wrapperHeadComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  commentText: {
    fontSize: 22,
    marginLeft: 10
  }
});

export default styles;
