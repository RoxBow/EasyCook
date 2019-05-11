import { StyleSheet } from 'react-native';
import { veryLightgrey } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: veryLightgrey,
    minHeight: '100%'
  },
  wrapperHead: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  name: {
    fontSize: 22,
    marginTop: 10,
  }
});

export default styles;
