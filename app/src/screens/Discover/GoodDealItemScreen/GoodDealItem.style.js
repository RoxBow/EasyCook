import { StyleSheet } from 'react-native';
import { orange } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15
  },

  headContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  eventName: {
    fontSize: 18,
    marginBottom: 8
  },
  proposedBy: {
    color: '#ccc'
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
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  btnAction: {
    flex: .5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  btnActionText: {
    fontSize: 15,
  }
});

export default styles;
