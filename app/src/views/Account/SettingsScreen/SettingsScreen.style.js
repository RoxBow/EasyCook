import { StyleSheet } from 'react-native';
import { veryLightgrey } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: veryLightgrey,
    minHeight: "100%"
  },

  icon: {
    marginRight: 12
  },

  btnLogout: {
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
    paddingVertical: 15
  },
  btnLogoutText: {
    color: '#000'
  },

  btnDeleteAccount: {
    backgroundColor: 'transparent',
    marginTop: 10
  }
});

export default styles;
