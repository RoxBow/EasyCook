import { StyleSheet } from 'react-native';
import { pink } from '../../constants/colors';

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: pink
  },
  btnText: {
    color: '#fff',
    fontSize: 16
  },
  btnRounded: {
    borderRadius: 30
  },
  btnTransparent: {
    backgroundColor: 'transparent'
  },
  textBtnTransparent: {
    color: pink
  }
});

export default styles;
