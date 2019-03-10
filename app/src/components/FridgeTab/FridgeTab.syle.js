import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapperIngredientInFridge: {
    paddingVertical: 15,
    paddingLeft: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 2,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15
  },
  wrapperHeadIngredient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginRight: 15
  },

  wrapperRecipes: {
    marginTop: 20,
    paddingHorizontal: 15
  },

  recipe: {
    marginRight: 10,
    marginBottom: 10
  }
});

export default styles;
