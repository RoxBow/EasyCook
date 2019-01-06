import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: 8,
    height: 80,
    borderRadius: 6,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    color: 'red',
    fontSize: 16,
    textTransform: 'uppercase'
  },

  time: {
    fontSize: 10
  },

  description: {
    fontSize: 10
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default styles;
