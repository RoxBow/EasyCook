import { StyleSheet } from 'react-native';
import { orange, lightgrey } from '../../../constants/colors';

const styles = StyleSheet.create({
  mark: {
    width: 7,
    height: 4,
    marginRight: 3,
    backgroundColor: lightgrey,
    borderRadius: 50
  },
  selectedMark: {
    backgroundColor: orange
  }
});

export default styles;
