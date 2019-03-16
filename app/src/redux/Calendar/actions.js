import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const CALENDAR = "CALENDAR";

export const SET_ERROR = `${CALENDAR}/SET_ERROR`;
export const ADD_RECIPE_CALENDAR = `${CALENDAR}/ADD_RECIPE_CALENDAR`;
export const UPDATE_RECIPES_CALENDAR = `${CALENDAR}/UPDATE_RECIPES_CALENDAR`;


const axiosCalendar = axios.create({
  baseURL: `${serverUrl}/api/calendar`
});

axiosCalendar.interceptors.request.use(
  async options => {
    options.headers['Authorization'] = 'bearer ' + (await getToken());
    return options;
  },
  error => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  }
);

export const fetchCalendar = () => {
  return dispatch => {
    axiosCalendar
      .get('/')
      .then(({ data }) => {
        dispatch(updateRecipesCalendar(data.recipesCalendar));
      })
      .catch(err => {});
  };
};


export const saveRecipeCalendar = (idRecipe, date) => {
  return dispatch => {
    axiosCalendar
      .post(`/add`, {
        idRecipe,
        date: JSON.stringify(date)
      })
      .then(({ data }) => {
        dispatch(addRecipeCalendar(data.recipeCalendar));
      })
      .catch(err => {
        // console.log('err', err);
        // dispatch(setError(err.response.data.message));
      });
  };
};

















export const addRecipeCalendar = recipe => ({
  type: ADD_RECIPE_CALENDAR,
  recipe
});

export const setError = error => ({
  type: SET_ERROR,
  error
});

export const updateRecipesCalendar = recipes => ({
  type: UPDATE_RECIPES_CALENDAR,
  recipes
});
