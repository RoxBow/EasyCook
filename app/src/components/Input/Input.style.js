import { StyleSheet } from 'react-native';
import { mainFont } from '../../constants/global';
import { grey, lightgrey } from '../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: lightgrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingRight: 30,
    paddingLeft: 60
  },
  wrapperBigInput: {
    paddingVertical: 30,
    paddingLeft: 25
  },
  wrapperDisabledInput: {
    opacity: .5
  },
  wrapperInputLabel: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  icon: {
    position: 'absolute',
    top: 15,
    left: 25
  },

  input: {
    fontSize: 18,
    fontFamily: mainFont,
  },
  bigInput: {
    fontSize: 24
  },
  placeholderImage: {
    fontSize: 18,
    color: grey,
  }
});

export default styles;
