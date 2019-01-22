import {
  SET_INGREDIENTS,
} from './actions';

const initialState = {
  ingredients: [],
  error: ''
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        refIngredients: action.ingredients
      };
    
    default:
      return state;
  }
};

export default recipeReducer;
