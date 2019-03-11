import { StyleSheet } from 'react-native';
import { orange } from '../../../constants/colors';

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 500
  },
  wrapperLogo: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  wrapperButtons: {
    position: 'absolute',
    bottom: 30,
    flex: 1,
    left: 0,
    right: 0,
    zIndex: 1
  },
  firstButton: {
    backgroundColor: '#fff',
    marginBottom: 10
  },
  button: {
    width: '65%',
    justifyContent: 'center'
  },
  firstTextButton: {
    color: orange
  },
});

export default styles;
