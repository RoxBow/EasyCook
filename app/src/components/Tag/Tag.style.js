import { StyleSheet } from 'react-native';
import { orange } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 30,
    borderColor: orange,
    borderWidth: 1,
    alignItems: 'center'
  },
  textTag: {
    color: orange,
    marginRight: 5
  }
});

export default styles;
