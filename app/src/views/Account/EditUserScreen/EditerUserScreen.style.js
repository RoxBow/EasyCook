import { StyleSheet } from 'react-native';
import { pink, lightgrey } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperInputPicture: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: lightgrey,
    width: '100%'
  },
  editPicture: {
    color: pink,
    fontSize: 20,

  },
});

export default styles;
