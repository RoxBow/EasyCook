import { StyleSheet } from 'react-native';
import { grey } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8F7',
    flex: 1,
    padding: 15
  },
  titleQuantity: {
    marginBottom: 10,
    color: grey
  },
  containerInput: {
    flexDirection: 'row',
    marginBottom: 15
  },
  numericInput: {
    borderRadius: 8,
    backgroundColor: '#fff',
    color: grey,
    paddingVertical: 20,
    width: '20%',
    textAlign: 'center',
    fontSize: 22,
    marginRight: 10
  },

  textSelect: {
    fontSize: 16,
    color: grey
  },
  wrapperSelect: {
    flex: 1
  }
});

export default styles;
