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

  wrapperInfo: {
    marginVertical: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  iconInfo: {
    marginRight: 8
  },

  wrapperParticipants: {
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    paddingVertical: 10,
    alignItems: 'center'
  },

  wrapperAbout: {
    marginVertical: 10,
  },
  wrapperDescription: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
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
