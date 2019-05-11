import {
  SET_ERROR,
  ADD_RECIPE_CALENDAR,
  UPDATE_RECIPES_CALENDAR,
  SET_SELECTED_DATE
} from './actions';

const initialState = {
  recipes: [],
  error: '',
  selectedDate: new Date()
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
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.date
      };
    default:
      return state;
  }
};

export default calendarReducer;
