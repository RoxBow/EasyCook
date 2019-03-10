import { StyleSheet } from 'react-native';
import { pink } from '../../constants/colors';

const styles = StyleSheet.create({
  select: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: pink,
    paddingVertical: 7,
    borderWidth: 0,
    zIndex: 1,
  },
  selectText: {
    color: '#fff',
    fontSize: 18
  }
});

export default styles;
