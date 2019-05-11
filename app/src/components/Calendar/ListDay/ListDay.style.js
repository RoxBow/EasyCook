import { StyleSheet } from 'react-native';
import { lightgrey } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: lightgrey,
    paddingBottom: 20,
    paddingHorizontal: 20
  }
});

export default styles;
