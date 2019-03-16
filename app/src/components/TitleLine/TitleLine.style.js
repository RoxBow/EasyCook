import { StyleSheet } from 'react-native';
import { lightgrey } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  line: {
    borderBottomColor: lightgrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '30%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    marginHorizontal: 10
  }
});

export default styles;
