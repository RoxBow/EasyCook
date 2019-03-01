import { SET_REF_DATA, UPDATE_RECIPES, UPDATE_RECIPE, SET_ERROR, ADD_RECIPE } from './actions';

const initialState = {
  refIngredients: [],
  refEquipments: [],
  error: '',
  recipes: []
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REF_DATA:
      return {
        ...state,
        refIngredients: action.refIngredients,
        refEquipments: action.refEquipments
      };
    case UPDATE_RECIPES:
      return {
        ...state,
        recipes: action.recipes
      };
    case UPDATE_RECIPE:
      const updatedRecipes = state.recipes.map(recipe => {
        if (recipe._id === action.recipe._id) {
          return action.recipe;
        }

        return recipe;
      });

      return {
        ...state,
        recipes: updatedRecipes
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      };
    default:
      return state;
  }
};

export default recipeReducer;
