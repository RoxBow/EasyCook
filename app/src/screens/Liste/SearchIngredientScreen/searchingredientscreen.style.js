import { StyleSheet } from 'react-native';
import { pink } from '../../../constants/colors';

const styles = StyleSheet.create({
  containerSearchBar: {
    backgroundColor: pink,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 15,
  },
  wrapperSearchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'transparent',
    borderWidth: 0,
  }
});

export default styles;
