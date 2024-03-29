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
    elevation: 2,
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
    flex: 0.6,
    paddingHorizontal: 5,
    paddingVertical: 10
  },

  nameText: {
    fontSize: 17
  },

  wrapperActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 5,
    paddingVertical: 5,
    paddingRight: 15,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  leftIcon: {
    marginRight: 10
  }
});

export default styles;
