import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapperContent: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -50
  },

  wrapperInfo: {
    marginVertical: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  iconInfo: {
    marginRight: 8
  },

  wrapperAbout: {
    marginVertical: 10,
  },
  wrapperAboutInfo: {
    flexDirection: 'row',
  },
  aboutInfo: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
  },
  aboutInfoText: {
    marginBottom: 5,
  },

  wrapperActions: {
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: .1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  btnAction: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActionText: {
    fontSize: 15,
  }
});

export default styles;
