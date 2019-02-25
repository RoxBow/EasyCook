import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '30%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    marginHorizontal: 10,
  }
});

export default styles;
