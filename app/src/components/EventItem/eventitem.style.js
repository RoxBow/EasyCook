import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },

  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },

  imageEvent: {
    flex: 0.4,
    width: 130,
    height: 130,
    borderRadius: 8
  },

  wrapperInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 0.6,
    paddingHorizontal: 5,
    paddingVertical: 10
  },

  nameText: {
    fontWeight: 'bold',
    fontSize: 17
  },

  wrapperActions: {
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 5,
    paddingVertical: 5,
    paddingRight: 15
  },

  icon: {
    alignSelf: 'flex-end'
  }
});

export default styles;
