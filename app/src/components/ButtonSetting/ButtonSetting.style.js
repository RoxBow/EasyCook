import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10
  },
  wrapperLabel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginLeft: 20,
    fontSize: 18
  }
});

export default styles;
