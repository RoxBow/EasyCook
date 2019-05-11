import { StyleSheet } from 'react-native';
import { lightgrey, grey } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapperComment: {
    padding: 20,
    backgroundColor: '#f7f9f9',
    borderBottomColor: lightgrey,
    borderBottomWidth: 1
  },

  wrapperHeadComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  username: {
    fontSize: 20,
    marginBottom: 6
  },

  commentText: {
    fontSize: 16,
    marginVertical: 10
  },

  wrapperActionComment: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  btnAction: {
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  btnDelete: {
    marginRight: 10
  },
  textBtnDelete: {
    color: grey
  }
});

export default styles;
