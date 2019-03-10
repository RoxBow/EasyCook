import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: -14,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 50
  },
  icon: { marginRight: 6 },
  text: {
    fontSize: 16
  }
});

export default styles;
