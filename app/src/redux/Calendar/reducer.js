import {
  SET_ERROR,
  ADD_RECIPE_CALENDAR,
  UPDATE_RECIPES_CALENDAR
} from './actions';

const initialState = {
  recipes: [],
  error: ''
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE_CALENDAR:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      };
    case UPDATE_RECIPES_CALENDAR:
      return {
        ...state,
        recipes: action.recipes
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default calendarReducer;
