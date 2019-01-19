import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  wrapperInput: {
    marginBottom: 10,
  },
  wrapperIngredient: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ingredient: {
    marginBottom: 5,
  },
  isSelected: {
    borderColor: 'green',
    borderWidth: 5,
  },  
  input: {
    backgroundColor: '#ccc',
    color: '#000',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
});

export default styles;
