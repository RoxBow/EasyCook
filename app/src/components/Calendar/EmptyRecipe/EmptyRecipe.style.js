import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: .1,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 6
  }
});

export default styles;
