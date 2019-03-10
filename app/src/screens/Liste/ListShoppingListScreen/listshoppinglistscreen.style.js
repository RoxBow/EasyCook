import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  title: {
    marginVertical: 10,
    textTransform: 'uppercase',
    color: 'grey',
    fontSize: 12,
  },

  wrapperShoppingList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }
});

export default styles;
